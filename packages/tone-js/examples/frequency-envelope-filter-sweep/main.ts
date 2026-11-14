// FrequencyEnvelope: one note opens a lowpass filter and closes it again
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { envView } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

const OCTAVES = [2, 4, 6] as const;

const describe = (env: Tone.FrequencyEnvelope): string => {
  const lo = Math.round(env.toFrequency(env.baseFrequency));
  return `cutoff sweeps ${lo} Hz to ${Math.round(lo * 2 ** env.octaves)} Hz  (octaves ${env.octaves})`;
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const view = envView(stage, { corner: { top: 'filter open', bottom: 'closed' } });

  return stage.run({
    build: () => {
      const out = new Tone.Volume(-10).toDestination();
      const amp = new Tone.AmplitudeEnvelope({ attack: 0.02, decay: 0, sustain: 1, release: 0.1 }).connect(out);
      const filter = new Tone.Filter({ type: 'lowpass', Q: 4, rolloff: -24 }).connect(amp);
      const osc = new Tone.Oscillator('A1', 'sawtooth').connect(filter).start();
      // Its output is a frequency in hertz, so it can drive the filter's cutoff directly.
      const env = new Tone.FrequencyEnvelope({ attack: 0.5, decay: 0.5, sustain: 0.2, release: 0.8, baseFrequency: 100, octaves: 4 });
      env.connect(filter.frequency);
      return { out, amp, filter, osc, env };
    },

    play: ({ env, amp }, time) => {
      const { hold, total } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
      amp.triggerAttackRelease(total, time);
    },

    variants: OCTAVES.map((n) => ({
      label: `${n} octaves`,
      apply: (g: { env: Tone.FrequencyEnvelope }) => (g.env.octaves = n),
    })),

    frame: (t) => view.frame(t),

    controls: ({ env }, bar) => {
      view.preview(env, describe(env));
      slider(bar, 'octaves', 1, 7, 0.5, 4, (v) => (env.octaves = v));
      slider(bar, 'baseFrequency', 50, 400, 10, 100, (v) => (env.baseFrequency = v), (v) => `${v} Hz`);
    },
  });
};

export default mount;
