// A trail is a line whose thickness varies per point, by a scale times a signal
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
      { name: 'size', value: 5, bind: { input: 'range', min: 1, max: 10 } },
    ],
    data: [{ name: 'table', values: [{ u: 1, v: 28 }, { u: 2, v: 55 }, { u: 3, v: 42 }, { u: 4, v: 34 }, { u: 5, v: 36 }, { u: 6, v: 48 }] }],
    scales: [
      { name: 'xscale', type: 'linear', range: 'width', zero: false, domain: { data: 'table', field: 'u' } },
      { name: 'yscale', type: 'linear', range: 'height', nice: true, zero: false, domain: { data: 'table', field: 'v' } },
      { name: 'zscale', type: 'linear', range: [5, 1], domain: { data: 'table', field: 'v' } },
    ],
    marks: [{
      type: 'trail',
      from: { data: 'table' },
      encode: {
        enter: { fill: { value: 'orange' } },
        update: {
          x: { scale: 'xscale', field: 'u' }, y: { scale: 'yscale', field: 'v' },
          size: { scale: 'zscale', field: 'v', mult: { signal: 'size' } },
          defined: { signal: 'defined || datum.u !== 3' },
        },
        hover: { opacity: { value: 0.5 } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ size: 5, defined: true }, { size: 10, defined: true }, { size: 2, defined: true }, { size: 7, defined: false }], 1300);
  return () => stage.dispose();
};

export default mount;
