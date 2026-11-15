// Density with a normal distribution: uniformly-spaced samples of a pdf for a chosen mean and stdev
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 5,
    signals: [
      { name: 'mean', value: 0, bind: { input: 'range', min: -4, max: 4, step: 0.1 } },
      { name: 'stdev', value: 1, bind: { input: 'range', min: 0.3, max: 3, step: 0.1 } },
    ],
    data: [
      {
        name: 'curve',
        transform: [
          {
            type: 'density',
            extent: [-8, 8],
            steps: 120,
            distribution: { function: 'normal', mean: { signal: 'mean' }, stdev: { signal: 'stdev' } },
            as: ['value', 'density'],
          },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-8, 8], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1.4], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', title: 'density', tickCount: 5 },
    ],
    title: { text: { signal: "'normal(mean ' + mean + ', stdev ' + stdev + ')'" }, color: '#ddd' },
    marks: [
      {
        type: 'area',
        from: { data: 'curve' },
        encode: {
          update: {
            x: { scale: 'x', field: 'value' },
            y: { scale: 'y', field: 'density' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.6 },
            stroke: { value: 'lightblue' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const poses: [number, number][] = [[0, 1], [-2.5, 0.5], [1.5, 1.8], [3, 0.4], [-1, 2.5]];
    stage.every(1300, async (i) => {
      const [m, s] = poses[i % poses.length]!;
      view.signal('mean', m).signal('stdev', s);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
