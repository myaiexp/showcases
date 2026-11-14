// Fat oscillator: count detuned copies spread apart in cents beat against each other
import * as Tone from 'tone';
import { slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const SETTINGS: [number, number][] = [[1, 0], [2, 25], [3, 25], [5, 50]];

export default oscMount({
  seconds: 4,
  notes: ['A2', 'A2', 'E3', 'E3'],
  step: 1,
  hold: 0.95,
  make: () => new Tone.FatOscillator({ frequency: 'A2', type: 'sawtooth', count: 1, spread: 0 }),
  caption: (osc) => `count ${osc.count}   spread ${osc.spread} cents`,
  variants: SETTINGS.map(([count, spread]) => ({
    label: `count ${count}, spread ${spread}`,
    apply: (osc: Tone.FatOscillator) => ((osc.count = count), (osc.spread = spread)),
  })),
  controls: (osc, bar, refresh) => {
    slider(bar, 'count', 1, 8, 1, 1, (n) => ((osc.count = n), refresh()));
    slider(bar, 'spread', 0, 100, 1, 0, (n) => ((osc.spread = n), refresh()), (n) => `${n} cents`);
  },
});
