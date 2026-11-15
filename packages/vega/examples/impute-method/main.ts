// Impute methods: replace missing values with the group's mean, median, min or max
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  [0, 0, 28], [1, 0, 43], [2, 0, 81], [4, 0, 19], [5, 0, 60], [6, 0, 35],
  [0, 1, 55], [1, 1, 91], [3, 1, 53], [4, 1, 70], [5, 1, 40], [6, 1, 88],
].map(([x, c, y]) => ({ x, c, y, real: 1 }));

const methods = ['mean', 'median', 'min', 'max'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 190,
    padding: 5,
    signals: [{ name: 'method', value: 'mean', bind: { input: 'select', options: methods } }],
    data: [
      {
        name: 'table',
        values: rows,
        // groupby makes the statistic per series; leave it out and it would be taken over all rows.
        transform: [{ type: 'impute', groupby: ['c'], key: 'x', field: 'y', method: { signal: 'method' } }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'color', type: 'ordinal', domain: [0, 1], range: ['tomato', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickMinStep: 1 }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'method: ' + method + ' (per series)'" }, color: '#ddd' },
    marks: [
      {
        type: 'group',
        from: { facet: { name: 'series', data: 'table', groupby: 'c' } },
        marks: [
          {
            type: 'line',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'x' },
                y: { scale: 'y', field: 'y' },
                stroke: { scale: 'color', field: 'c' },
                strokeWidth: { value: 2 },
              },
            },
          },
          {
            type: 'symbol',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'x' },
                y: { scale: 'y', field: 'y' },
                size: { value: 90 },
                stroke: { scale: 'color', field: 'c' },
                strokeWidth: { value: 2 },
                fill: { signal: "isValid(datum.real) ? scale('color', datum.c) : 'transparent'" },
              },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'method', methods, 1500);
  return () => stage.dispose();
};

export default mount;
