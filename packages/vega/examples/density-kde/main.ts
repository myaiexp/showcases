// Density with a kde distribution: smooth a sample into a curve, with the kernel bandwidth as a signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { gaussRows } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [{ name: 'bw', value: 0, bind: { input: 'select', options: [0, 0.5, 1, 2, 4, 8] } }],
    data: [
      { name: 'obs', values: [...gaussRows(41, 30, 30, 5), ...gaussRows(42, 24, 62, 8)] },
      {
        name: 'curve',
        // No extent: the kde distribution works out its own from the sample.
        transform: [
          {
            type: 'density',
            steps: 150,
            distribution: { function: 'kde', from: 'obs', field: 'v', bandwidth: { signal: 'bw' } },
            as: ['x', 'd'],
          },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'curve', field: 'd' }, zero: true, nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'density' }],
    title: { text: { signal: "bw == 0 ? 'bandwidth: automatic' : 'bandwidth: ' + bw" }, color: '#ddd' },
    marks: [
      {
        type: 'area',
        from: { data: 'curve' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'd' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.55 },
          },
        },
      },
      {
        // A rug of the observations along the axis.
        type: 'rect',
        from: { data: 'obs' },
        encode: {
          update: {
            x: { scale: 'x', field: 'v' },
            width: { value: 1.5 },
            y: { signal: 'height - 10' },
            height: { value: 10 },
            fill: { value: 'orange' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'bw', [0, 0.5, 2, 4, 8, 1], 1400);
  return () => stage.dispose();
};

export default mount;
