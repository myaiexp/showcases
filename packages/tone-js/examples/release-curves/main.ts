// Release curves: how a note fades out after the key is let go, curve by curve
import type * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { ampVoice, envView, secs, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const CURVES = ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'] as const;

const describe = (env: Tone.Envelope): string => `releaseCurve: ${JSON.stringify(env.releaseCurve)}   release ${secs(env.toSeconds(env.release))}`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const view = envView(stage);

  return stage.run({
    build: () => ampVoice({ attack: 0.05, decay: 0.1, sustain: 0.8, release: 1.4, releaseCurve: 'linear' }, 'sawtooth'),

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
    },

    variants: CURVES.map((curve) => ({
      label: curve,
      apply: (g: AmpVoice) => (g.env.releaseCurve = curve),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      select(bar, 'releaseCurve', CURVES, (c) => (env.releaseCurve = c));
      slider(bar, 'release', 0.1, 1.5, 0.05, 1.4, (v) => (env.release = v), secs);
    },
  });
};

export default mount;
