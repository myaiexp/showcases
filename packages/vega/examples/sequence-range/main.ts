// Sequence: generate numbers from start toward stop by step, with no input data
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 110,
    padding: 5,
    signals: [
      { name: 'start', value: 0, bind: { input: 'range', min: -10, max: 10, step: 1 } },
      { name: 'stop', value: 10, bind: { input: 'range', min: -10, max: 20, step: 1 } },
      { name: 'step', value: 2, bind: { input: 'range', min: -5, max: 5, step: 1 } },
    ],
    data: [
      {
        name: 'seq',
        // A step of 0 would never end, so the signal holds it off zero.
        transform: [{ type: 'sequence', start: { signal: 'start' }, stop: { signal: 'stop' }, step: { signal: 'step == 0 ? 1 : step' }, as: 'value' }],
      },
    ],
    scales: [{ name: 'x', type: 'linear', domain: [-12, 22], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 17 }],
    title: {
      text: { signal: "'start ' + start + ', stop ' + stop + ' (exclusive), step ' + (step == 0 ? 1 : step) + '  ->  ' + length(data('seq')) + ' values'" },
      color: '#ddd',
    },
    marks: [
      {
        type: 'rule',
        from: { data: 'seq' },
        encode: { update: { x: { scale: 'x', field: 'value' }, y: { signal: 'height' }, y2: { value: 30 }, stroke: { value: '#567' } } },
      },
      {
        type: 'symbol',
        from: { data: 'seq' },
        encode: { update: { x: { scale: 'x', field: 'value' }, y: { value: 30 }, fill: { value: 'orange' }, size: { value: 90 } } },
      },
      {
        type: 'text',
        from: { data: 'seq' },
        encode: {
          update: {
            x: { scale: 'x', field: 'value' },
            y: { value: 12 },
            text: { field: 'value' },
            align: { value: 'center' },
            fill: { value: '#ddd' },
            fontSize: { value: 10 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const runs: [number, number, number][] = [[0, 10, 2], [1, 20, 3], [10, -5, -3], [-8, 8, 4], [0, 12, 1], [15, 0, -5]];
    stage.every(1500, async (i) => {
      const [a, b, s] = runs[i % runs.length]!;
      view.signal('start', a).signal('stop', b).signal('step', s);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
