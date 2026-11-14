// Pulse width: a PulseOscillator's width signal turns a square wave thin and nasal
import * as Tone from 'tone';
import { slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

export default oscMount({
  seconds: 3,
  make: () => new Tone.PulseOscillator('C3', 0),
  caption: (osc) => `width ${osc.width.value.toFixed(2)}  (up ${Math.round(((osc.width.value + 1) / 2) * 100)}% of the time)`,
  variants: [0, 0.5, 0.8, 0.95].map((width) => ({
    label: `width ${width}`,
    apply: (osc: Tone.PulseOscillator) => (osc.width.value = width),
  })),
  controls: (osc, bar, refresh) => {
    slider(bar, 'width', -0.95, 0.95, 0.01, 0, (w) => {
      osc.width.value = w;
      refresh();
    });
  },
});
