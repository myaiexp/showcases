// PWM shimmer: a PWMOscillator sweeps its pulse width at the modulationFrequency
import * as Tone from 'tone';
import { slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

export default oscMount({
  seconds: 4,
  notes: ['C3', 'G3', 'C3', 'Eb3'],
  step: 0.9,
  hold: 0.8,
  make: () => new Tone.PWMOscillator('C3', 1),
  caption: (osc) => `pulse width sweeps ${osc.modulationFrequency.value} times a second`,
  variants: [0.5, 3, 10].map((rate) => ({
    label: `modulationFrequency ${rate}`,
    apply: (osc: Tone.PWMOscillator) => (osc.modulationFrequency.value = rate),
  })),
  controls: (osc, bar, refresh) => {
    slider(bar, 'modulationFrequency', 0.1, 20, 0.1, 1, (hz) => {
      osc.modulationFrequency.value = hz;
      refresh();
    }, (hz) => `${hz} Hz`);
  },
});
