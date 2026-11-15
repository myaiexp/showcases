// A rule is one segment from (x, y) to (x2, y2), with dash and cap channels
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220, height: 220, padding: 5,
    signals: [
      { name: 'x', value: 40, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'y', value: 40, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'x2', value: 180, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'y2', value: 180, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'strokeWidth', value: 8, bind: { input: 'range', min: 0, max: 14, step: 0.5 } },
      { name: 'strokeCap', value: 'butt', bind: { input: 'select', options: ['butt', 'round', 'square'] } },
      { name: 'strokeDash', value: [1, 0], bind: { input: 'select', options: [[1, 0], [8, 8], [8, 4], [4, 4], [4, 2], [2, 1], [1, 1]] } },
    ],
    marks: [
      {
        type: 'rule',
        encode: {
          enter: { stroke: { value: 'orange' } },
          update: {
            x: { signal: 'x' }, y: { signal: 'y' }, x2: { signal: 'x2' }, y2: { signal: 'y2' },
            strokeWidth: { signal: 'strokeWidth' }, strokeDash: { signal: 'strokeDash' }, strokeCap: { signal: 'strokeCap' },
          },
          hover: { opacity: { value: 0.5 } },
        },
      },
      { type: 'symbol', interactive: false, encode: { update: { x: { signal: 'x' }, y: { signal: 'y' }, size: { value: 30 }, fill: { value: '#fff' } } } },
      { type: 'symbol', interactive: false, encode: { update: { x: { signal: 'x2' }, y: { signal: 'y2' }, size: { value: 30 }, fill: { value: 'tomato' } } } },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { x: 40, y: 40, x2: 180, y2: 180, strokeDash: [1, 0], strokeCap: 'butt' },
    { x: 30, y: 190, x2: 190, y2: 40, strokeDash: [8, 8], strokeCap: 'round' },
    { x: 110, y: 20, x2: 110, y2: 200, strokeDash: [1, 1], strokeCap: 'square' },
    { x: 20, y: 110, x2: 200, y2: 110, strokeDash: [4, 2], strokeCap: 'round' },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
