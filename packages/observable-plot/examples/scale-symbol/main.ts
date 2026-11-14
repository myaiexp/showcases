// The symbol scale: a dot shape per category, range picks shapes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const ranges = {
  default: undefined,
  'circle, cross, square': ['circle', 'cross', 'square'],
  'diamond, star, wye': ['diamond', 'star', 'wye'],
} as const;
type Range = keyof typeof ranges;
const names = Object.keys(ranges) as Range[];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { range: 'default' as Range },
    render: ({ range }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 6,
        symbol: { legend: !preview, ...(ranges[range] ? { range: [...ranges[range]] } : {}) },
        marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', symbol: 'species', stroke: 'species' })],
      }),
    step: (_s, i) => ({ range: names[i % 3] }),
    controls: (bar, live) => select(bar, 'symbol range ', names, live.state.range, (range) => live.set({ range })),
  });
};

export default mount;
