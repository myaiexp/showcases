// A line mark under every interpolate method, bundle included
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [
      { name: 'interpolate', value: 'linear', bind: { input: 'select', options: ['basis', 'bundle', 'cardinal', 'catmull-rom', 'linear', 'monotone', 'natural', 'step', 'step-after', 'step-before'] } },
      { name: 'tension', value: 0, bind: { input: 'range', min: 0, max: 1, step: 0.05 } },
      { name: 'strokeWidth', value: 4, bind: { input: 'range', min: 0, max: 10, step: 0.5 } },
    ],
    data: [{ name: 'table', values: [{ u: 1, v: 28 }, { u: 2, v: 55 }, { u: 3, v: 42 }, { u: 4, v: 34 }, { u: 5, v: 36 }, { u: 6, v: 48 }] }],
    scales: [
      { name: 'xscale', type: 'linear', range: 'width', zero: false, domain: { data: 'table', field: 'u' } },
      { name: 'yscale', type: 'linear', range: 'height', nice: true, zero: false, domain: { data: 'table', field: 'v' } },
    ],
    marks: [
      {
        type: 'line',
        from: { data: 'table' },
        encode: {
          enter: { stroke: { value: 'orange' } },
          update: {
            x: { scale: 'xscale', field: 'u' }, y: { scale: 'yscale', field: 'v' },
            interpolate: { signal: 'interpolate' }, tension: { signal: 'tension' }, strokeWidth: { signal: 'strokeWidth' },
          },
          hover: { opacity: { value: 0.5 } },
        },
      },
      { type: 'symbol', from: { data: 'table' }, encode: { update: { x: { scale: 'xscale', field: 'u' }, y: { scale: 'yscale', field: 'v' }, size: { value: 36 }, fill: { value: '#fff' } } } },
    ],
  };

  const view = await stage.render(spec);

  const kinds = ['basis', 'bundle', 'cardinal', 'catmull-rom', 'linear', 'monotone', 'natural', 'step', 'step-after', 'step-before'];
  cycleSteps(stage, view, kinds.map((interpolate) => ({ interpolate, tension: ['bundle', 'cardinal', 'catmull-rom'].includes(interpolate) ? 0.9 : 0 })), 1100);
  return () => stage.dispose();
};

export default mount;
