// Formula: derive a field from an expression; initonly freezes the value at first sight
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    signals: [
      { name: 'freq', value: 1, bind: { input: 'range', min: 0.5, max: 4, step: 0.25 } },
      { name: 'amp', value: 1, bind: { input: 'range', min: 0.2, max: 1.5, step: 0.1 } },
    ],
    data: [
      {
        name: 'wave',
        transform: [
          { type: 'sequence', start: 0, stop: 6.3, step: 0.07, as: 'x' },
          // Re-evaluated whenever freq or amp change...
          { type: 'formula', as: 'live', expr: 'amp * sin(datum.x * freq)' },
          // ...but with initonly each row keeps the value it first got.
          { type: 'formula', as: 'frozen', expr: 'amp * sin(datum.x * freq)', initonly: true },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 6.3], range: 'width' },
      { name: 'y', type: 'linear', domain: [-1.6, 1.6], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'live: ' + amp + ' * sin(x * ' + freq + ')   frozen: first values'" }, color: '#ddd' },
    marks: [
      {
        type: 'line',
        from: { data: 'wave' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'frozen' },
            stroke: { value: '#778' },
            strokeDash: { value: [5, 4] },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'line',
        from: { data: 'wave' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'live' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2.5 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const poses: [number, number][] = [[2, 1.2], [3, 0.6], [1, 1.4], [4, 0.9], [1.5, 0.4]];
    stage.every(1300, async (i) => {
      const [f, a] = poses[i % poses.length]!;
      view.signal('freq', f).signal('amp', a);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
