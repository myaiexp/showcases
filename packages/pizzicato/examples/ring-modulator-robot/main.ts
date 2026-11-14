// The voice recording through a RingModulator at three speeds
import Pizzicato, { type RingModulator } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.2 });
  const picture = flow(stage.visual, 'voice', ['RingMod'], 'ears');
  const speed = gauge(stage.visual, 'speed', '#ff8fb1');
  const show = (r: RingModulator): void => {
    // The gauge runs 0 to 500 Hz, the range the card's settings use.
    speed.set(r.speed / 500, `${Math.round(r.speed)} Hz`);
    picture.caption(r.speed < 50 ? 'growl' : r.speed < 200 ? 'robot' : 'alien');
  };

  return stage.run({
    build: async () => {
      // A recorded stand-in voice; the full view could take the microphone the same way.
      const voice = await fileSound('voice');
      const robot = new Pizzicato.Effects.RingModulator({ speed: 30, distortion: 1, mix: 0.8 });
      voice.addEffect(robot);
      return { voice, robot };
    },
    play: ({ voice, robot }, at) => {
      stage.show(() => show(robot));
      voice.play();
      at(2.1, () => voice.stop());
    },
    variants: [
      { label: 'speed 30', apply: () => undefined },
      { label: 'speed 90', apply: ({ robot }) => (robot.speed = 90) },
      { label: 'speed 400', apply: ({ robot }) => (robot.speed = 400) },
    ],
    controls: ({ robot }, bar) => {
      show(robot);
      tweak(bar, robot, [['speed', 0, 500, 5, ' Hz'], ['distortion', 0.2, 50, 0.2], ['mix', 0, 1, 0.05]], () => show(robot));
    },
  });
};

export default mount;
