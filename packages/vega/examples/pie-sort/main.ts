// sort orders the slices by value instead of by row order; omitting field gives equal slices
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const panel = (name: string, x: number, field: boolean) => ({
    type: 'arc' as const,
    from: { data: name },
    encode: {
      enter: { fill: { scale: 'color', field: 'id' }, x: { value: x }, y: { value: 105 }, stroke: { value: '#1a1a1a' } },
      update: { startAngle: { field: 'startAngle' }, endAngle: { field: 'endAngle' }, innerRadius: { value: field ? 40 : 0 }, outerRadius: { value: 100 } },
    },
  });
  const rows = [{ id: 'a', v: 4 }, { id: 'b', v: 9 }, { id: 'c', v: 2 }, { id: 'd', v: 12 }, { id: 'e', v: 6 }, { id: 'f', v: 8 }];

  const spec: Spec = {
    width: 630,
    height: 210,
    padding: 5,
    autosize: 'none',
    signals: [{ name: 'sort', value: true, bind: { input: 'checkbox' } }],
    data: [
      { name: 'byValue', values: rows, transform: [{ type: 'pie', field: 'v', sort: { signal: 'sort' } }] },
      // No field: every slice gets the same angle, whatever its value.
      { name: 'equal', values: rows, transform: [{ type: 'pie' }] },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category10' } }],
    marks: [panel('byValue', 105, true), panel('equal', 315, false)],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ sort: false }, { sort: true }], 1700);
  return () => stage.dispose();
};

export default mount;
