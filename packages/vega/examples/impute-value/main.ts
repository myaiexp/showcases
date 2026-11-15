// Impute with a constant: fill the gaps in grouped series with a value, and add extra key values
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

// Each series lacks some x values. `real` marks rows that came from the data.
const rows = [
  [0, 0, 28], [1, 0, 43], [2, 0, 81], [4, 0, 19], [5, 0, 60],
  [0, 1, 55], [1, 1, 91], [3, 1, 53], [4, 1, 70], [5, 1, 40],
  [1, 2, 20], [2, 2, 36], [3, 2, 65], [5, 2, 52],
].map(([x, c, y]) => ({ x, c, y, real: 1 }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 190,
    padding: 5,
    signals: [{ name: 'fill', value: 0, bind: { input: 'range', min: 0, max: 100, step: 5 } }],
    data: [
      {
        name: 'table',
        values: rows,
        // One row is added for each (series, x) pair that is missing. keyvals adds x = 6, never seen in the data.
        transform: [{ type: 'impute', groupby: ['c'], key: 'x', keyvals: [6], field: 'y', method: 'value', value: { signal: 'fill' } }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'color', type: 'ordinal', domain: [0, 1, 2], range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickMinStep: 1 }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'imputed rows get y = ' + fill + '  (hollow rings)'" }, color: '#ddd' },
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
                size: { value: 80 },
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
  cycle(stage, view, 'fill', [0, 50, 100, 25], 1500);
  return () => stage.dispose();
};

export default mount;
