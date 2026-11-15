// A path mark draws an SVG path string, rotated and scaled around its x and y
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220, height: 220, padding: 5,
    signals: [
      { name: 'path', value: 'M-50,-50 L50,50 V-50 L-50,50 Z', bind: { input: 'text', placeholder: 'SVG path string' } },
      { name: 'scaleX', value: 1, bind: { input: 'range', min: 0.1, max: 2, step: 0.1 } },
      { name: 'scaleY', value: 1, bind: { input: 'range', min: 0.1, max: 2, step: 0.1 } },
      { name: 'angle', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'strokeWidth', value: 6, bind: { input: 'range', min: 0, max: 10, step: 0.5 } },
      { name: 'strokeCap', value: 'butt', bind: { input: 'radio', options: ['butt', 'round', 'square'] } },
      { name: 'strokeJoin', value: 'miter', bind: { input: 'radio', options: ['bevel', 'miter', 'round'] } },
    ],
    marks: [{
      type: 'path',
      encode: {
        enter: { fill: { value: 'steelblue' }, stroke: { value: 'orange' }, x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
        update: {
          path: { signal: 'path' },
          angle: { signal: 'angle' }, scaleX: { signal: 'scaleX' }, scaleY: { signal: 'scaleY' },
          strokeWidth: { signal: 'strokeWidth' }, strokeCap: { signal: 'strokeCap' }, strokeJoin: { signal: 'strokeJoin' },
        },
        hover: { opacity: { value: 0.5 } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { angle: 0, scaleX: 1, scaleY: 1, strokeJoin: 'miter' },
    { angle: 45, scaleX: 1.6, scaleY: 0.6, strokeJoin: 'round' },
    { angle: 120, scaleX: 0.7, scaleY: 1.5, strokeJoin: 'bevel' },
    { angle: -90, scaleX: 1.2, scaleY: 1.2, strokeJoin: 'miter' },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
