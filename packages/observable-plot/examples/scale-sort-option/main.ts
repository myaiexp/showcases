// The sort mark option orders an ordinal domain
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const sorts: Record<string, Plot.BarYOptions['sort']> = {
  'none (alphabetical)': undefined,
  '{x: "y"}': { x: 'y' },
  '{x: "y", order: "descending"}': { x: 'y', order: 'descending' },
  '{x: "-y"}': { x: '-y' },
  '{x: "y", reverse: true}': { x: 'y', reverse: true },
  '{x: "y", limit: 5}': { x: 'y', limit: 5 },
  '{x: "y", limit: -5}': { x: 'y', limit: -5 },
  '{x: "-y", limit: 5}': { x: '-y', limit: 5 },
  '{x: {value: "y", order: "descending"}}': { x: { value: 'y', order: 'descending' } },
};
const names = Object.keys(sorts);

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot(el, ctx, {
    initial: { sort: names[1] as string },
    render: ({ sort }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [Plot.barY(alphabet, { x: 'letter', y: 'frequency', sort: sorts[sort] }), Plot.ruleY([0])],
      }),
    step: (_s, i) => ({ sort: names[i % names.length] as string }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'sort ', names, live.state.sort, (sort) => live.set({ sort })),
  });
};

export default mount;
