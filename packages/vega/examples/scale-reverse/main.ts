// reverse flips the order of a scale range, for a band scale and a colour ramp at once
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400, height: 190, padding: 5,
    signals: [{ name: 'rev', value: false, bind: { input: 'checkbox', name: 'reverse' } }],
    data: [{ name: 'table', values: [{ c: 'A', v: 20 }, { c: 'B', v: 35 }, { c: 'C', v: 50 }, { c: 'D', v: 65 }, { c: 'E', v: 80 }, { c: 'F', v: 95 }] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: 'width', padding: 0.1, reverse: { signal: 'rev' } },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'color', type: 'linear', domain: [0, 100], range: { scheme: 'viridis' }, reverse: { signal: 'rev' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    marks: [{
      type: 'rect', from: { data: 'table' },
      encode: { update: {
        x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
        y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'color', field: 'v' },
      } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ rev: false }, { rev: true }], 1700);
  return () => stage.dispose();
};

export default mount;
