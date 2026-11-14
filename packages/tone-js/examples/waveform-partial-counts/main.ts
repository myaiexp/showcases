// Waveform partial counts: "sawtooth8" keeps only the first 8 harmonics of a sawtooth
import * as Tone from 'tone';
import { select, slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const BASES = ['sawtooth', 'square', 'triangle'] as const;

export default oscMount({
  seconds: 3,
  make: () => new Tone.Oscillator('C3', 'sawtooth'),
  caption: (osc) => `type "${osc.type}"`,
  // Each variant plays the same tune; a smaller count rounds the buzz off.
  variants: ['sawtooth', 'sawtooth12', 'sawtooth4', 'sawtooth2'].map((type) => ({
    label: type,
    apply: (osc: Tone.Oscillator) => (osc.type = type as Tone.ToneOscillatorType),
  })),
  controls: (osc, bar, refresh) => {
    let base: (typeof BASES)[number] = 'sawtooth';
    let count = 0;
    const apply = (): void => {
      osc.type = (count ? `${base}${count}` : base) as Tone.ToneOscillatorType;
      refresh();
    };
    select(bar, 'wave', BASES, (b) => ((base = b), apply()));
    slider(bar, 'partials', 0, 16, 1, 0, (n) => ((count = n), apply()), (n) => (n ? String(n) : 'all'));
  },
});
