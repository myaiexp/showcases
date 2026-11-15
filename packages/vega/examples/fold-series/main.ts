// Fold: collapse several columns of a wide table into key and value rows, ready for one line mark
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): object[] => {
  const rand = rng(110 + n);
  let a = 30, b = 50, c = 70;
  return Array.from({ length: 8 }, (_, i) => {
    a += (rand() - 0.45) * 16;
    b += (rand() - 0.5) * 16;
    c += (rand() - 0.55) * 16;
    return { year: 2010 + i, north: Math.round(a), south: Math.round(b), east: Math.round(c) };
  });
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 190,
    padding: 5,
    data: [
      { name: 'wide', values: make(0) },
      {
        name: 'long',
        source: 'wide',
        // Three columns become 3 rows per input row: region (the old column name) and sales.
        transform: [{ type: 'fold', fields: ['north', 'south', 'east'], as: ['region', 'sales'] }],
      },
      rowsOf('rows', 'long', 12),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [2010, 2017], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 120], range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['north', 'south', 'east'], range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', format: 'd', tickCount: 8 }, { orient: 'left', scale: 'y' }],
    legends: [{ stroke: 'color', orient: 'top-left', direction: 'horizontal', symbolType: 'stroke' }],
    marks: [
      {
        type: 'group',
        from: { facet: { name: 'series', data: 'long', groupby: 'region' } },
        marks: [
          {
            type: 'line',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'year' },
                y: { scale: 'y', field: 'sales' },
                stroke: { scale: 'color', field: 'region' },
                strokeWidth: { value: 2.5 },
              },
            },
          },
        ],
      },
      ...tableMarks('rows', [{ field: 'year', width: 40 }, { field: 'region', width: 50 }, { field: 'sales' }]),
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'wide', make, 2000);
  return () => stage.dispose();
};

export default mount;
