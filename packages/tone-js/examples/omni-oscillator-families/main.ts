// Omni oscillator: one class switches between plain, fm, am, fat, pwm and pulse waves
import * as Tone from 'tone';
import { select } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const TYPES = ['sine', 'sawtooth', 'fmsine', 'amsine', 'fatsawtooth', 'pwm', 'pulse'] as const;

export default oscMount({
  seconds: 4,
  notes: ['C3', 'G3', 'E3', 'C4'],
  step: 0.5,
  hold: 0.4,
  make: () => new Tone.OmniOscillator('C3', 'sine'),
  caption: (osc) => `type "${osc.type}"`,
  variants: ['sine', 'fmsine', 'amsine', 'fatsawtooth', 'pwm', 'pulse'].map((type) => ({
    label: type,
    apply: (osc: Tone.OmniOscillator<Tone.Oscillator>) => (osc.type = type as Tone.ToneOscillatorType),
  })),
  controls: (osc, bar, refresh) => {
    select(bar, 'type', TYPES, (t) => ((osc.type = t), refresh()), 'sine');
  },
});
