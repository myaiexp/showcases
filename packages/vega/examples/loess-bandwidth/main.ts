// Loess: locally weighted smoothing of a scatterplot, with the bandwidth as a signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, normals, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const gauss = normals(rng(161));
const points = Array.from({ length: 80 }, (_, i) => {
  const x = (i / 79) * 10;
  return { x, y: 50 + 25 * Math.sin(x * 0.9) + gauss() * 10 };
});

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 5,
    signals: [{ name: 'bw', value: 0.3, bind: { input: 'range', min: 0.05, max: 1, step: 0.05 } }],
    data: [
      { name: 'points', values: points },
      {
        name: 'trend',
        source: 'points',
        transform: [{ type: 'loess', x: 'x', y: 'y', bandwidth: { signal: 'bw' }, as: ['x', 'smooth'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'loess bandwidth ' + bw" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'points' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: '#789' }, size: { value: 24 } } },
      },
      {
        type: 'line',
        from: { data: 'trend' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'smooth' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 3 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'bw', [0.1, 0.2, 0.4, 0.7, 1, 0.3], 1400);
  return () => stage.dispose();
};

export default mount;
