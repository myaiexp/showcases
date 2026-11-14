// Organ drawbars: custom partials set how loud each harmonic of an oscillator is
import * as Tone from 'tone';
import { button, slider } from '../../shared/controls.ts';
import { oscMount } from '../../shared/osc-line.ts';

const BARS = 6;
const PRESETS: Record<string, number[]> = {
  flute: [1, 0.1, 0, 0, 0, 0],
  'full organ': [1, 0.9, 0.8, 0.6, 0.5, 0.4],
  hollow: [1, 0, 0.7, 0, 0.5, 0],
  reedy: [0.6, 1, 0.3, 0.9, 0.2, 0.7],
};
const text = (p: number[]): string => p.map((v) => '▮'.repeat(Math.round(v * 5)).padEnd(5, '·')).join(' ');

export default oscMount({
  seconds: 3,
  make: () => new Tone.Oscillator({ frequency: 'C3', type: 'custom', partials: PRESETS['full organ'] }),
  caption: (osc) => `harmonics 1-${BARS}\n${text(osc.partials)}`,
  variants: Object.entries(PRESETS).map(([label, partials]) => ({
    label,
    apply: (osc: Tone.Oscillator) => (osc.partials = partials),
  })),
  controls: (osc, bar, refresh) => {
    const levels = [...PRESETS['full organ']!];
    const sliders = levels.map((v, i) =>
      slider(bar, `harmonic ${i + 1}`, 0, 1, 0.05, v, (x) => {
        levels[i] = x;
        osc.partials = [...levels];
        refresh();
      }),
    );
    for (const [name, p] of Object.entries(PRESETS)) {
      button(bar, name, () => {
        p.forEach((v, i) => {
          levels[i] = v;
          sliders[i]!.value = String(v);
          sliders[i]!.dispatchEvent(new Event('input'));
        });
      });
    }
  },
});
