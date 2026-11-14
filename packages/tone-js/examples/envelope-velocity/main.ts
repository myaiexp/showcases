// Velocity: a lower velocity scales the whole envelope, and the note, down
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { ampVoice, envView, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const VELOCITIES = [1, 0.6, 0.25] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const view = envView(stage, { corner: { top: 'velocity 1', bottom: 'silent' } });
  let velocity: number = VELOCITIES[0];

  return stage.run({
    build: () => ampVoice({ attack: 0.08, decay: 0.3, sustain: 0.6, release: 0.6 }, 'sawtooth'),

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, `triggerAttackRelease(duration, time, velocity = ${velocity})`, velocity);
      env.triggerAttackRelease(hold, time, velocity);
    },

    variants: VELOCITIES.map((v) => ({
      label: `velocity ${v}`,
      apply: (_: AmpVoice) => {
        velocity = v;
      },
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, 'velocity 1');
      slider(bar, 'velocity', 0.05, 1, 0.05, 1, (v) => (velocity = v));
    },
  });
};

export default mount;
