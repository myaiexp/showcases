// Flatten with index: one output row per array entry, plus the entry's position
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): object[] => {
  const rand = rng(90 + n);
  return ['ann', 'bob', 'cat'].map((name) => ({
    name,
    laps: Array.from({ length: 3 + Math.floor(rand() * 4) }, () => Math.round(50 + rand() * 40)),
  }));
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 180,
    padding: 5,
    data: [
      { name: 'runners', values: make(0) },
      {
        name: 'laps',
        source: 'runners',
        // `laps` is an array per row; flatten writes one row per entry, with its index in `lap`.
        transform: [{ type: 'flatten', fields: ['laps'], index: 'lap', as: ['seconds'] }],
      },
      rowsOf('rows', 'laps', 11),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6], range: 'width' },
      { name: 'y', type: 'linear', domain: [40, 100], range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['ann', 'bob', 'cat'], range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', title: 'lap (index)', tickMinStep: 1 },
      { orient: 'left', scale: 'y', title: 'seconds' },
    ],
    legends: [{ fill: 'color', orient: 'top-left', direction: 'horizontal' }],
    marks: [
      {
        type: 'group',
        from: { facet: { name: 'series', data: 'laps', groupby: 'name' } },
        marks: [
          {
            type: 'line',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'lap' },
                y: { scale: 'y', field: 'seconds' },
                stroke: { scale: 'color', field: 'name' },
                strokeWidth: { value: 2 },
              },
            },
          },
          {
            type: 'symbol',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'lap' },
                y: { scale: 'y', field: 'seconds' },
                fill: { scale: 'color', field: 'name' },
                size: { value: 40 },
              },
            },
          },
        ],
      },
      ...tableMarks('rows', [{ field: 'name', width: 40 }, { field: 'lap', width: 36 }, { field: 'seconds', width: 60 }]),
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'runners', make, 2000);
  return () => stage.dispose();
};

export default mount;
