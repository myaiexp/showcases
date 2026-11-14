// ADSR: an AmplitudeEnvelope shapes a steady tone into a pluck, pad or swell
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { ampVoice, envView, secs, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const SHAPES = {
  pluck: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.2 },
  pad: { attack: 0.8, decay: 0.3, sustain: 0.7, release: 1 },
  swell: { attack: 1, decay: 0.1, sustain: 0.9, release: 0.3 },
} as const;

const describe = (env: Tone.AmplitudeEnvelope): string =>
  `attack ${secs(env.toSeconds(env.attack))}   decay ${secs(env.toSeconds(env.decay))}   sustain ${env.sustain}   release ${secs(env.toSeconds(env.release))}`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5 });
  const view = envView(stage, { corner: { top: 'loud', bottom: 'silent' } });

  return stage.run({
    build: () => ampVoice(SHAPES.pluck, 'sawtooth'),

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
    },

    // The same tone, three envelopes.
    variants: (Object.keys(SHAPES) as (keyof typeof SHAPES)[]).map((name) => ({
      label: name,
      apply: (g: AmpVoice) => g.env.set(SHAPES[name]),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      slider(bar, 'attack', 0.005, 1, 0.005, 0.005, (v) => (env.attack = v), secs);
      slider(bar, 'decay', 0.01, 1, 0.01, 0.3, (v) => (env.decay = v), secs);
      slider(bar, 'sustain', 0, 1, 0.01, 0, (v) => (env.sustain = v));
      slider(bar, 'release', 0.01, 1, 0.01, 0.2, (v) => (env.release = v), secs);
    },
  });
};

export default mount;
