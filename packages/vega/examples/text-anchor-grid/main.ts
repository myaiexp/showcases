// Every align and baseline pair around one anchor point per cell
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 480, height: 300, padding: 5,
    signals: [
      { name: 'fontSize', value: 16, bind: { input: 'range', min: 8, max: 28, step: 1 } },
      { name: 'dx', value: 0, bind: { input: 'range', min: -20, max: 20, step: 1 } },
      { name: 'dy', value: 0, bind: { input: 'range', min: -20, max: 20, step: 1 } },
      { name: 'angle', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
    ],
    data: [{
      name: 'cells',
      values: ['alphabetic', 'top', 'middle', 'bottom', 'line-top', 'line-bottom'].flatMap((baseline, r) =>
        ['left', 'center', 'right'].map((align, c) => ({ align, baseline, x: 70 + c * 160, y: 28 + r * 49 }))),
    }],
    marks: [
      { type: 'symbol', interactive: false, from: { data: 'cells' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, fill: { value: 'tomato' }, size: { value: 22 } } } },
      {
        type: 'text',
        from: { data: 'cells' },
        encode: {
          enter: { text: { signal: 'datum.align + " " + datum.baseline' }, fill: { value: 'orange' } },
          update: {
            x: { field: 'x' }, y: { field: 'y' },
            align: { field: 'align' }, baseline: { field: 'baseline' },
            fontSize: { signal: 'fontSize' }, dx: { signal: 'dx' }, dy: { signal: 'dy' }, angle: { signal: 'angle' },
          },
          hover: { opacity: { value: 0.5 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ fontSize: 12, dx: 0, dy: 0, angle: 0 }, { fontSize: 12, dx: 10, dy: -6, angle: 0 }, { fontSize: 11, dx: 0, dy: 0, angle: -25 }, { fontSize: 13, dx: -8, dy: 6, angle: 20 }], 1400);
  return () => stage.dispose();
};

export default mount;
