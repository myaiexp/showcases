// Density with a weight channel that a slider skews between sexes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = (await csv('penguins.csv')).filter((d) => d.sex);
  return mountPlot<{ skew: number }>(el, ctx, {
    initial: { skew: 0 },
    render: ({ skew }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        inset: 10,
        color: { legend: !preview },
        marks: [
          Plot.density(penguins, {
            weight: (d) => (d.sex === 'FEMALE' ? 1 - skew : 1 + skew),
            x: 'flipper_length_mm',
            y: 'culmen_length_mm',
            strokeOpacity: 0.5,
            clip: true,
          }),
          Plot.dot(penguins, {
            x: 'flipper_length_mm',
            y: 'culmen_length_mm',
            stroke: 'sex',
            strokeOpacity: (d) => (d.sex === 'FEMALE' ? 1 - skew : 1 + skew),
          }),
          Plot.frame(),
        ],
      }),
    step: (_s, i) => ({ skew: [0, -0.8, 0, 0.8][i % 4] }),
    previewMs: 3000,
    controls: (bar, live) => {
      slider(bar, 'skew (-F/+M)', [-1, 1, 0.01], live.state.skew, (skew) => live.set({ skew }));
    },
  });
};

export default mount;
