// Band scale with range {step}: the chart width follows the step size and the number of bands
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    height: 160, padding: 5,
    signals: [
      { name: 'step', value: 30, bind: { input: 'range', min: 14, max: 60, step: 2 } },
      // The range is { step }, so the width follows from step times the band count.
      { name: 'width', update: "span(range('x'))" },
    ],
    data: [{ name: 'table', values: [
    { c: 'A', v: 28 }, { c: 'B', v: 55 }, { c: 'C', v: 43 }, { c: 'D', v: 91 },
    { c: 'E', v: 81 }, { c: 'F', v: 53 },
  ] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: { step: { signal: 'step' } }, paddingInner: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    marks: [
      {
        type: 'rect', from: { data: 'table' },
        encode: { update: {
          x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'orange' },
        } },
      },
      { type: 'text', encode: { update: { x: { signal: 'width' }, y: { value: 8 }, text: { signal: "'step ' + step + ' => width ' + width" }, fill: { value: '#ddd' }, align: { value: 'right' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ step: 30 }, { step: 56 }, { step: 16 }, { step: 44 }], 1400);
  return () => stage.dispose();
};

export default mount;
