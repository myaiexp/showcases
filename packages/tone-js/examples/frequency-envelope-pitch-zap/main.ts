// FrequencyEnvelope on an oscillator's pitch: laser zap, kick drum and riser
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { envView } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const SHAPES = {
  zap: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.1, baseFrequency: 100, octaves: 4 },
  kick: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.05, baseFrequency: 45, octaves: 3 },
  riser: { attack: 0.8, decay: 0.05, sustain: 1, release: 0.2, baseFrequency: 150, octaves: 3 },
} as const;

type Name = keyof typeof SHAPES;
const NAMES = Object.keys(SHAPES) as Name[];

const describe = (env: Tone.FrequencyEnvelope): string => {
  const lo = Math.round(env.toFrequency(env.baseFrequency));
  return `pitch moves between ${lo} Hz and ${Math.round(lo * 2 ** env.octaves)} Hz`;
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 1.8 });
  const view = envView(stage, { corner: { top: 'high pitch', bottom: 'low pitch' } });

  return stage.run({
    build: () => {
      const out = new Tone.Volume(-8).toDestination();
      const amp = new Tone.AmplitudeEnvelope({ attack: 0.002, decay: 0, sustain: 1, release: 0.08 }).connect(out);
      const osc = new Tone.Oscillator(0, 'sine').connect(amp).start();
      const env = new Tone.FrequencyEnvelope(SHAPES.zap);
      env.connect(osc.frequency);
      return { out, amp, osc, env };
    },

    play: ({ env, amp }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
      amp.triggerAttackRelease(hold, time);
    },

    variants: (Object.keys(SHAPES) as (keyof typeof SHAPES)[]).map((name) => ({
      label: name,
      apply: (g: { env: Tone.FrequencyEnvelope }) => g.env.set(SHAPES[name]),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      select(bar, 'sound', NAMES, (name) => {
        env.set(SHAPES[name]);
        view.preview(env, describe(env));
      });
    },
  });
};

export default mount;
