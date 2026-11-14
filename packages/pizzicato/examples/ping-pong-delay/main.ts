// A hit through a PingPongDelay: each echo lights the other speaker
import Pizzicato, { type PingPongDelay } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak } from '../../shared/fx.ts';
import { echoBars, stereo, timeline } from '../../shared/fx-pictures.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { smallText } from '../../shared/widgets.ts';

const SECONDS = 2.8;
const HIT_AT = 0.2;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS, channels: 2 });
  stage.visual.style.gap = '4px';
  const speakers = stereo(stage.visual);
  const bars = timeline(stage.visual, SECONDS, ctx.preview ? 30 : 60);
  const note = smallText(stage.visual);
  const redraw = (p: PingPongDelay): void => {
    bars.set(echoBars({ kind: 'pingpong', start: HIT_AT, time: p.time, feedback: p.feedback, mix: p.mix }, SECONDS));
    note.textContent = `time ${p.time.toFixed(2)} s · feedback ${p.feedback.toFixed(2)}`;
  };

  return stage.run({
    build: async () => {
      const snare = await fileSound('snare');
      const pingPong = new Pizzicato.Effects.PingPongDelay({ feedback: 0.6, time: 0.3, mix: 0.7 });
      snare.addEffect(pingPong);
      return { snare, pingPong };
    },
    play: ({ snare, pingPong }, at) => {
      stage.show(() => redraw(pingPong));
      snare.play();
      // The speakers light up as each echo is due: the hit is in the middle, then L, R, L...
      const light = (when: number, l: number, r: number): void => {
        at(when, () => stage.show(() => speakers.set(l, r)));
        at(when + 0.18, () => stage.show(() => speakers.set(0, 0)));
      };
      stage.show(() => speakers.set(0, 0));
      light(HIT_AT, 1, 1);
      echoBars({ kind: 'pingpong', start: HIT_AT, time: pingPong.time, feedback: pingPong.feedback, mix: pingPong.mix }, SECONDS)
        .slice(1)
        .forEach((bar, i) => {
          if (bar.kind === 'bar') light(bar.t, i % 2 === 0 ? bar.level : 0, i % 2 === 0 ? 0 : bar.level);
        });
    },
    variants: [
      { label: 'fast: time 0.15', apply: ({ pingPong }) => ((pingPong.time = 0.15), (pingPong.feedback = 0.7)) },
      { label: 'medium: time 0.3', apply: () => undefined },
      { label: 'slow: time 0.45', apply: ({ pingPong }) => ((pingPong.time = 0.45), (pingPong.feedback = 0.5)) },
    ],
    frame: (t) => bars.head(t),
    controls: ({ pingPong }, bar) => {
      redraw(pingPong);
      tweak(bar, pingPong, [['feedback', 0, 0.95, 0.05], ['time', 0.05, 1, 0.05, ' s'], ['mix', 0, 1, 0.05]], () => redraw(pingPong));
    },
  });
};

export default mount;
