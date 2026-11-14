// Envelope into a Panner: a scaled Envelope swings a tone left to right
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { envView, secs } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const SHAPES = {
  'slow glide': { attack: 1.1, decay: 0.01, sustain: 1, release: 1 },
  'quick flick': { attack: 0.15, decay: 0.01, sustain: 1, release: 0.15 },
  'stop in the middle': { attack: 1, decay: 0.01, sustain: 0.5, release: 1 },
} as const;

const describe = (env: Tone.Envelope): string => `attack ${secs(env.toSeconds(env.attack))}, sustain ${env.sustain}: pan ends at ${(env.sustain * 2 - 1).toFixed(1)}`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.8, channels: 2 });
  const view = envView(stage, { corner: { top: 'right', bottom: 'left' } });

  return stage.run({
    build: () => {
      const out = new Tone.Volume(-10).toDestination();
      const panner = new Tone.Panner(0).connect(out);
      const osc = new Tone.Oscillator(330, 'triangle').connect(panner).start();
      // An Envelope outputs 0 to 1, the pan control wants -1 to 1: Scale stretches it.
      const scale = new Tone.Scale(-1, 1);
      scale.connect(panner.pan);
      const env = new Tone.Envelope(SHAPES['slow glide']);
      env.connect(scale);
      return { out, panner, osc, scale, env };
    },

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
    },

    variants: (Object.keys(SHAPES) as (keyof typeof SHAPES)[]).map((name) => ({
      label: name,
      apply: (g: { env: Tone.Envelope }) => g.env.set(SHAPES[name]),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      select(bar, 'motion', Object.keys(SHAPES) as (keyof typeof SHAPES)[], (name) => {
        env.set(SHAPES[name]);
        view.preview(env, describe(env));
      });
    },
  });
};

export default mount;
