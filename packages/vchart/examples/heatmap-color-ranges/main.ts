// Heatmap palettes: the linear color scale's range
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(3);
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const values = ['r1', 'r2', 'r3', 'r4', 'r5'].flatMap((row, j) =>
  COLS.map((col, i) => ({ col, row, value: Math.round(50 + Math.sin(i / 1.5 + j) * 35 + rand() * 15) })),
);
const PALETTES: Record<string, string[]> = {
  warm: ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'],
  cool: ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'],
  diverging: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
};
const NAMES = Object.keys(PALETTES);

const mount: Mount = (el, ctx) =>
  mountLive<{ palette: string }>(el, ctx, {
    initial: { palette: 'warm' },
    build: ({ palette }) =>
      ({
        type: 'common',
        data: [{ id: 'data', values }],
        series: [{ type: 'heatmap', xField: 'col', yField: 'row', valueField: 'value', cell: { style: { fill: { field: 'value', scale: 'color' } } } }],
        color: { type: 'linear', domain: [{ dataId: 'data', fields: ['value'] }], range: PALETTES[palette] },
        axes: [
          { orient: 'bottom', type: 'band', grid: { visible: false }, bandPadding: 0 },
          { orient: 'left', type: 'band', grid: { visible: false }, bandPadding: 0 },
        ],
        legends: { visible: !ctx.preview, orient: 'right', type: 'color', field: 'value' },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'color.range', NAMES, (palette) => live.set({ palette }));
    },
    step: (_s, i) => ({ palette: NAMES[i % NAMES.length] ?? 'warm' }),
    previewMs: 1500,
  });

export default mount;
