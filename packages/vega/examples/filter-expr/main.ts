// Filter: keep rows whose predicate expression is true; the expression may read signals
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(81);
const points = Array.from({ length: 90 }, () => ({ x: Math.round(rand() * 100), y: Math.round(10 ** (rand() * 3) * 10) / 10 }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 200,
    padding: 5,
    signals: [
      { name: 'xmin', value: 0, bind: { input: 'range', min: 0, max: 90, step: 5 } },
      { name: 'logmin', value: 0, bind: { input: 'range', min: 0, max: 2.5, step: 0.1 } },
    ],
    data: [
      { name: 'all', values: points },
      {
        name: 'kept',
        source: 'all',
        // The docs' second form: a base-10 log test, here against a signal.
        transform: [{ type: 'filter', expr: 'datum.x >= xmin && log(datum.y) / LN10 >= logmin' }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'log', domain: [1, 1000], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true }],
    title: { text: { signal: "length(data('kept')) + ' of ' + length(data('all')) + ' rows kept'" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'all' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: '#566' }, size: { value: 30 } } },
      },
      {
        type: 'symbol',
        from: { data: 'kept' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: 'orange' }, size: { value: 60 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const steps: [number, number][] = [[0, 0], [40, 0.5], [60, 1.2], [30, 2], [75, 1.6], [10, 0.3]];
    stage.every(1300, async (i) => {
      const [a, b] = steps[i % steps.length]!;
      view.signal('xmin', a).signal('logmin', b);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
