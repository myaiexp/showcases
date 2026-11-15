// domainMid inserts a mid-point so a diverging colour range splits at a chosen value
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400, height: 200, padding: 5,
    signals: [{ name: 'mid', value: 50, bind: { input: 'range', min: 10, max: 90, step: 5, name: 'domainMid' } }],
    data: [{
      name: 'cells',
      transform: [
        { type: 'sequence', start: 0, stop: 100, as: 'n' },
        { type: 'formula', as: 'col', expr: 'datum.n % 10' },
        { type: 'formula', as: 'row', expr: 'floor(datum.n / 10)' },
      ],
    }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'cells', field: 'col' }, range: 'width', padding: 0.05 },
      { name: 'y', type: 'band', domain: { data: 'cells', field: 'row' }, range: 'height', padding: 0.05 },
      // Three domain stops (min, mid, max) against the "diverging" range default.
      { name: 'color', type: 'linear', domain: [0, 100], domainMid: { signal: 'mid' }, range: 'diverging' },
    ],
    legends: [{ fill: 'color', type: 'gradient', gradientLength: 180 }],
    marks: [
      {
        type: 'rect', from: { data: 'cells' },
        encode: { update: {
          x: { scale: 'x', field: 'col' }, width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'row' }, height: { scale: 'y', band: 1 }, fill: { scale: 'color', field: 'n' },
        } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ mid: 50 }, { mid: 20 }, { mid: 80 }, { mid: 35 }], 1500);
  return () => stage.dispose();
};

export default mount;
