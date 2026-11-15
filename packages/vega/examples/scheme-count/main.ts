// count turns a continuous scheme into a discrete palette of that many colours
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 120, padding: 5,
    signals: [{ name: 'k', value: 5, bind: { input: 'range', min: 3, max: 9, step: 1, name: 'count' } }],
    data: [
      { name: 'cols', transform: [{ type: 'sequence', start: 0, stop: 60, as: 'n' }] },
      { name: 'swatches', transform: [{ type: 'sequence', start: 0, stop: 9, as: 'n' }, { type: 'filter', expr: 'datum.n < k' }] },
    ],
    scales: [
      { name: 'xc', type: 'band', domain: { data: 'cols', field: 'n' }, range: 'width' },
      { name: 'xs', type: 'band', domain: { data: 'swatches', field: 'n' }, range: 'width', paddingInner: 0.06 },
      { name: 'ramp', type: 'linear', domain: [0, 59], range: { scheme: 'viridis' } },
      // An ordinal scale with a continuous scheme and a count: k colours sampled from the ramp.
      { name: 'palette', type: 'ordinal', domain: { data: 'swatches', field: 'n' }, range: { scheme: 'viridis', count: { signal: 'k' } } },
    ],
    marks: [
      {
        type: 'rect', from: { data: 'cols' },
        encode: { update: { x: { scale: 'xc', field: 'n' }, width: { scale: 'xc', band: 1 }, y: { value: 0 }, height: { value: 30 }, fill: { scale: 'ramp', field: 'n' } } },
      },
      {
        type: 'rect', from: { data: 'swatches' },
        encode: { update: { x: { scale: 'xs', field: 'n' }, width: { scale: 'xs', band: 1 }, y: { value: 44 }, height: { value: 60 }, fill: { scale: 'palette', field: 'n' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ k: 5 }, { k: 3 }, { k: 9 }, { k: 4 }, { k: 7 }], 1300);
  return () => stage.dispose();
};

export default mount;
