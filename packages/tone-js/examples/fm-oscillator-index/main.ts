// FM oscillator: a modulator bending the carrier's pitch adds harmonics
import * as Tone from 'tone';
import { select, slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const SHAPES = ['sine', 'square', 'triangle', 'sawtooth'] as const;

export default oscMount({
  seconds: 3,
  make: () => new Tone.FMOscillator({ frequency: 'C3', type: 'sine', modulationType: 'sine', harmonicity: 2, modulationIndex: 0 }),
  caption: (osc) =>
    `modulationIndex ${osc.modulationIndex.value.toFixed(1)}   harmonicity ${osc.harmonicity.value.toFixed(2)}\nmodulator: ${osc.modulationType}`,
  variants: [0, 2, 6, 14].map((index) => ({
    label: `modulationIndex ${index}`,
    apply: (osc: Tone.FMOscillator) => (osc.modulationIndex.value = index),
  })),
  controls: (osc, bar, refresh) => {
    osc.modulationIndex.value = 4;
    refresh();
    slider(bar, 'modulationIndex', 0, 20, 0.5, 4, (v) => ((osc.modulationIndex.value = v), refresh()));
    slider(bar, 'harmonicity', 0.25, 6, 0.25, 2, (v) => ((osc.harmonicity.value = v), refresh()));
    select(bar, 'modulator', SHAPES, (t) => ((osc.modulationType = t), refresh()));
  },
});
