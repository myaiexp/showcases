// Density mixture: a weighted blend of distributions, drawn over its weighted components
import type { Data, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const part = (name: string, distribution: object, weight: string): Data => ({
    name,
    transform: [
      { type: 'density', extent: [-6, 10], steps: 130, distribution: distribution as never, as: ['x', 'p'] },
      // Scale the component by its normalised weight so it sits under the mixture.
      { type: 'formula', as: 'p', expr: `datum.p * ${weight} / (w1 + w2)` },
    ],
  });
  const left = { function: 'normal', mean: -1, stdev: 1 };
  const right = { function: 'normal', mean: 5, stdev: 1.6 };

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 5,
    signals: [
      { name: 'w1', value: 1, bind: { input: 'range', min: 0.1, max: 4, step: 0.1 } },
      { name: 'w2', value: 1, bind: { input: 'range', min: 0.1, max: 4, step: 0.1 } },
    ],
    data: [
      {
        name: 'mix',
        transform: [
          {
            type: 'density',
            extent: [-6, 10],
            steps: 130,
            // Weights are normalised to sum to 1.
            // Cast: the mixture's weights may be signals, which the Distribution type does not list.
            distribution: { function: 'mixture', distributions: [left, right], weights: [{ signal: 'w1' }, { signal: 'w2' }] } as never,
            as: ['x', 'p'],
          },
        ],
      },
      part('first', left, 'w1'),
      part('second', right, 'w2'),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-6, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 0.45], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'density', tickCount: 5 }],
    title: { text: { signal: "'weights ' + w1 + ' : ' + w2" }, color: '#ddd' },
    marks: [
      ...(['first', 'second'] as const).map((d, i) => ({
        type: 'area' as const,
        from: { data: d },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'p' },
            y2: { scale: 'y', value: 0 },
            fill: { value: i ? 'orange' : 'seagreen' },
            fillOpacity: { value: 0.45 },
          },
        },
      })),
      {
        type: 'line',
        from: { data: 'mix' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'p' }, stroke: { value: '#eee' }, strokeWidth: { value: 2 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ws: [number, number][] = [[1, 1], [3, 1], [1, 3], [0.4, 2]];
    stage.every(1400, async (i) => {
      const [a, b] = ws[i % ws.length]!;
      view.signal('w1', a).signal('w2', b);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
