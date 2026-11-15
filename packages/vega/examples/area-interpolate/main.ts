// An area mark under every interpolate method, with tension and a gap in the data
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [
      { name: 'defined', value: true, bind: { input: 'checkbox' } },
      { name: 'interpolate', value: 'linear', bind: { input: 'select', options: ['basis', 'cardinal', 'catmull-rom', 'linear', 'monotone', 'natural', 'step', 'step-after', 'step-before'] } },
      { name: 'tension', value: 0, bind: { input: 'range', min: 0, max: 1, step: 0.05 } },
    ],
    data: [{ name: 'table', values: [{ u: 1, v: 28 }, { u: 2, v: 55 }, { u: 3, v: 42 }, { u: 4, v: 34 }, { u: 5, v: 36 }, { u: 6, v: 48 }] }],
    scales: [
      { name: 'xscale', type: 'linear', range: 'width', zero: false, domain: { data: 'table', field: 'u' } },
      { name: 'yscale', type: 'linear', range: 'height', nice: true, zero: true, domain: { data: 'table', field: 'v' } },
    ],
    marks: [
      {
        type: 'area',
        from: { data: 'table' },
        encode: {
          enter: { fill: { value: 'steelblue' }, fillOpacity: { value: 0.55 }, stroke: { value: 'orange' }, strokeWidth: { value: 2.5 } },
          update: {
            x: { scale: 'xscale', field: 'u' }, y: { scale: 'yscale', field: 'v' }, y2: { scale: 'yscale', value: 0 },
            // The third point is dropped when "defined" is off.
            defined: { signal: 'defined || datum.u !== 3' },
            interpolate: { signal: 'interpolate' }, tension: { signal: 'tension' },
          },
        },
      },
      { type: 'symbol', from: { data: 'table' }, encode: { update: { x: { scale: 'xscale', field: 'u' }, y: { scale: 'yscale', field: 'v' }, size: { value: 40 }, fill: { value: '#fff' } } } },
    ],
  };

  const view = await stage.render(spec);

  const kinds = ['basis', 'cardinal', 'catmull-rom', 'linear', 'monotone', 'natural', 'step', 'step-after', 'step-before'];
  cycleSteps(stage, view, kinds.map((interpolate, i) => ({ interpolate, tension: interpolate === 'cardinal' || interpolate === 'catmull-rom' ? 0.8 : 0, defined: i !== 5 })), 1100);
  return () => stage.dispose();
};

export default mount;
