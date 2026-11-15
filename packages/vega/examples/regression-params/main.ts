// Regression params: return the fitted coefficients and R-squared per group instead of trend points
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, normals, rng } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const gauss = normals(rng(241));
const points = ['a', 'b', 'c'].flatMap((g, k) =>
  Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 10;
    return { g, x, y: 10 + k * 14 + (k + 1) * 2.2 * x * (k === 1 ? -1 : 1) + gauss() * (4 + k * 3) };
  }),
);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 190,
    padding: 5,
    signals: [{ name: 'order', value: 1, bind: { input: 'select', options: [1, 2, 3] } }],
    data: [
      { name: 'points', values: points },
      {
        name: 'trend',
        source: 'points',
        transform: [{ type: 'regression', groupby: ['g'], x: 'x', y: 'y', method: 'poly', order: { signal: 'order' }, extent: [0, 10], as: ['x', 'fit'] }],
      },
      {
        name: 'model',
        source: 'points',
        // params: true: one row per group with `coef` (intercept first) and `rSquared`.
        transform: [
          { type: 'regression', groupby: ['g'], x: 'x', y: 'y', method: 'poly', order: { signal: 'order' }, params: true },
          { type: 'formula', as: 'c0', expr: 'datum.coef[0]' },
          { type: 'formula', as: 'c1', expr: 'datum.coef[1]' },
          { type: 'formula', as: 'c2', expr: 'datum.coef[2]' },
        ],
      },
      rowsOf('rows', 'model', 3),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: [-30, 90], range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['a', 'b', 'c'], range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'poly order ' + order + ': coef holds ' + (order + 1) + ' values'" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'points' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { scale: 'color', field: 'g' }, fillOpacity: { value: 0.6 }, size: { value: 22 } } },
      },
      {
        type: 'line',
        from: { data: 'trend' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'fit' }, stroke: { scale: 'color', field: 'g' }, strokeWidth: { value: 2 } } },
      },
      ...tableMarks('rows', [{ field: 'g', width: 22 }, { field: 'c0', width: 50 }, { field: 'c1', width: 50 }, { field: 'c2', width: 50 }, { field: 'rSquared', title: 'rSquared' }], { gap: 24 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'order', [1, 2, 3, 2], 1700);
  return () => stage.dispose();
};

export default mount;
