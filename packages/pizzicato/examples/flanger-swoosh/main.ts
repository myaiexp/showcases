// A held sawtooth note through a Flanger, with the copy's changing delay drawn as a bar
import Pizzicato, { type Flanger } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { tweak, wave } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.6 });
  const picture = flow(stage.visual, 'drone', ['Flanger'], 'ears');
  const copy = gauge(stage.visual, 'delay', '#ffb86b');
  // The settings of the pass being shown: a card renders every variant before it animates any.
  let shown: Pick<Flanger, 'mix' | 'time' | 'speed' | 'depth'> | null = null;

  return stage.run({
    build: () => {
      const drone = wave('sawtooth', 110, 0.35, { attack: 0.05, release: 0.2 });
      const flanger = new Pizzicato.Effects.Flanger({ time: 0.45, speed: 0.2, depth: 0.5, feedback: 0.5, mix: 0.5 });
      drone.addEffect(flanger);
      return { drone, flanger };
    },
    play: ({ drone, flanger: f }, at) => {
      const { mix, time, speed, depth } = f;
      stage.show(() => {
        shown = stage.preview ? { mix, time, speed, depth } : f;
        picture.caption(mix === 0 ? 'flanger off' : `sweeps ${(0.5 + 4.5 * speed).toFixed(1)}x a second`);
      });
      drone.play();
      at(2.4, () => drone.stop());
    },
    variants: [
      { label: 'mix 0: no flanger', apply: ({ flanger: f }) => (f.mix = 0) },
      { label: 'slow swirl', apply: ({ flanger: f }) => Object.assign(f, { speed: 0.1, depth: 0.4, feedback: 0.3 }) },
      { label: 'jet plane', apply: ({ flanger: f }) => Object.assign(f, { time: 0.5, speed: 0.45, depth: 1, feedback: 0.7 }) },
    ],
    // The flanger's own LFO moves the delay: this redraws that sine from the settings
    // (the sweep's start is only lined up with the sound in a card).
    frame: (time) => {
      const f = shown;
      if (!f || f.mix === 0) return copy.set(0, 'off');
      const ms = (0.001 + f.time * 0.019 + (0.0005 + f.depth * 0.0045) * Math.sin(2 * Math.PI * (0.5 + 4.5 * f.speed) * time)) * 1000;
      copy.set(ms / 26, `${ms.toFixed(1)} ms`);
    },
    controls: ({ flanger: f }, bar) =>
      tweak(bar, f, [['time', 0, 1, 0.05], ['speed', 0, 1, 0.05], ['depth', 0, 1, 0.05], ['feedback', 0, 1, 0.05], ['mix', 0, 1, 0.05]]),
  });
};

export default mount;
