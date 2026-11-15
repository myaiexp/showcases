// Regression methods: six parametric fits of the same points, each drawn over its own extent
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, normals, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const methods = ['linear', 'log', 'exp', 'pow', 'quad', 'poly'];
const gauss = normals(rng(231));
// Positive, growing, mildly curved data: every method can be fitted.
const points = Array.from({ length: 36 }, (_, i) => {
  const x = 1 + (i / 35) * 9;
  return { x, y: Math.max(1, 6 + 4 * x + 0.7 * x * x - 0.04 * x ** 3 + gauss() * 6) };
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 5,
    signals: [{ name: 'method', value: 'linear', bind: { input: 'select', options: methods } }],
    data: [
      { name: 'points', values: points },
      {
        name: 'fit',
        source: 'points',
        // order only matters for poly; it is the polynomial order, here cubic.
        transform: [{ type: 'regression', x: 'x', y: 'y', method: { signal: 'method' }, order: 3, extent: [1, 10], as: ['x', 'fit'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 120], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'method: ' + method" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'points' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: '#789' }, size: { value: 28 } } },
      },
      {
        type: 'line',
        from: { data: 'fit' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'fit' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 3 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'method', methods, 1400);
  return () => stage.dispose();
};

export default mount;
