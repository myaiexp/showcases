// Linear scale: bar heights stay proportional while the domain maximum moves
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400, height: 200, padding: 5,
    signals: [{ name: 'top', value: 100, bind: { input: 'range', min: 90, max: 250, step: 5 } }],
    data: [{ name: 'table', values: [
          { c: 'A', v: 28 }, { c: 'B', v: 55 }, { c: 'C', v: 43 }, { c: 'D', v: 91 },
          { c: 'E', v: 81 }, { c: 'F', v: 53 }, { c: 'G', v: 19 }, { c: 'H', v: 87 },
        ] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: 'width', padding: 0.1 },
      // Equal steps in value are equal steps in pixels: y = m * value + b.
      { name: 'y', type: 'linear', domain: [0, { signal: 'top' }], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 },
    ],
    marks: [
      {
        type: 'rect', from: { data: 'table' },
        encode: { update: {
          x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
          y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' },
        } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ top: 100 }, { top: 150 }, { top: 250 }, { top: 120 }]);
  return () => stage.dispose();
};

export default mount;
