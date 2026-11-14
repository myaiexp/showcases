// Attack curves: one fade-in drawn as linear, exponential, sine, bounce, more
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider, select } from '../../shared/controls.ts';
import { ampVoice, envView, secs, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const CURVES = ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'] as const;

const describe = (env: Tone.Envelope): string => `attackCurve: ${JSON.stringify(env.attackCurve)}   attack ${secs(env.toSeconds(env.attack))}`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const view = envView(stage);

  return stage.run({
    build: () => ampVoice({ attack: 1.2, decay: 0.1, sustain: 0.8, release: 0.4, attackCurve: 'linear' }, 'sawtooth'),

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
    },

    variants: CURVES.map((curve) => ({
      label: curve,
      apply: (g: AmpVoice) => (g.env.attackCurve = curve),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      select(bar, 'attackCurve', CURVES, (c) => (env.attackCurve = c));
      slider(bar, 'attack', 0.1, 2, 0.05, 1.2, (v) => (env.attack = v), secs);
    },
  });
};

export default mount;
