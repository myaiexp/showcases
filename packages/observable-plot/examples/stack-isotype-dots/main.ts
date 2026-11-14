// Without y, stackY counts rows: stacked penguin dots (isotype)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const FILLS = ['sex', 'island'] as const;
type Fill = (typeof FILLS)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ fill: Fill }>(el, ctx, {
    initial: { fill: 'sex' },
    render: ({ fill }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 20,
        y: { grid: true, label: 'Penguins' },
        color: { legend: !preview },
        marks: [
          Plot.dot(penguins, Plot.stackY({ x: 'species', fill, r: preview ? 3 : 4.5 })),
          Plot.ruleY([0]),
        ],
      }),
    step: (_s, i) => ({ fill: FILLS[i % 2] ?? 'sex' }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'fill', FILLS, live.state.fill, (fill) => live.set({ fill }));
    },
  });
};

export default mount;
