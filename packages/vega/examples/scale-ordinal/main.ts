// Ordinal scale: each category gets its own colour from category20, as the set of categories grows
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'n', value: 8, bind: { input: 'range', min: 4, max: 12, step: 1, name: 'categories' } }],
    data: [
      { name: 'all', values: [
          { c: 'A', v: 28 }, { c: 'B', v: 55 }, { c: 'C', v: 43 }, { c: 'D', v: 91 },
          { c: 'E', v: 81 }, { c: 'F', v: 53 }, { c: 'G', v: 19 }, { c: 'H', v: 87 },
        { c: 'I', v: 66 }, { c: 'J', v: 38 }, { c: 'K', v: 72 }, { c: 'L', v: 47 }] },
      { name: 'table', source: 'all', transform: [{ type: 'window', ops: ['row_number'], as: ['rank'] }, { type: 'filter', expr: 'datum.rank <= n' }] },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: 'width', padding: 0.1 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'color', type: 'ordinal', domain: { data: 'table', field: 'c' }, range: { scheme: 'category20' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    marks: [{
      type: 'rect', from: { data: 'table' },
      encode: { update: {
        x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
        y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'color', field: 'c' },
      } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ n: 8 }, { n: 12 }, { n: 5 }, { n: 10 }], 1500);
  return () => stage.dispose();
};

export default mount;
