// AM oscillator: a modulator shapes the carrier's loudness, adding sidebands
import * as Tone from 'tone';
import { select, slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const SHAPES = ['sine', 'square', 'triangle', 'sawtooth'] as const;

export default oscMount({
  seconds: 3,
  make: () => new Tone.AMOscillator({ frequency: 'C3', type: 'sine', modulationType: 'square', harmonicity: 1 }),
  caption: (osc) => `harmonicity ${osc.harmonicity.value.toFixed(2)}   modulator: ${osc.modulationType}`,
  variants: [0.5, 1, 2.5].map((h) => ({
    label: `harmonicity ${h}`,
    apply: (osc: Tone.AMOscillator) => (osc.harmonicity.value = h),
  })),
  controls: (osc, bar, refresh) => {
    slider(bar, 'harmonicity', 0.25, 6, 0.25, 1, (v) => ((osc.harmonicity.value = v), refresh()));
    select(bar, 'modulator', SHAPES, (t) => ((osc.modulationType = t), refresh()), 'square');
  },
});
