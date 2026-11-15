// cornerRadius rounds all corners; four per-corner channels override it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 170, padding: 5,
    signals: [
      { name: 'cornerRadius', value: 12, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'tl', value: 40, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'tr', value: 0, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'br', value: 40, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'bl', value: 0, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'strokeWidth', value: 4, bind: { input: 'range', min: 0, max: 10 } },
    ],
    marks: [
      {
        type: 'rect',
        encode: {
          enter: { fill: { value: 'steelblue' }, stroke: { value: 'orange' }, x: { value: 10 }, y: { value: 10 }, width: { value: 180 }, height: { value: 140 } },
          update: { cornerRadius: { signal: 'cornerRadius' }, strokeWidth: { signal: 'strokeWidth' } },
          hover: { opacity: { value: 0.6 } },
        },
      },
      {
        type: 'rect',
        encode: {
          enter: { fill: { value: 'seagreen' }, stroke: { value: '#d6f5df' }, x: { value: 220 }, y: { value: 10 }, width: { value: 180 }, height: { value: 140 } },
          update: {
            cornerRadiusTopLeft: { signal: 'tl' }, cornerRadiusTopRight: { signal: 'tr' },
            cornerRadiusBottomRight: { signal: 'br' }, cornerRadiusBottomLeft: { signal: 'bl' },
            strokeWidth: { signal: 'strokeWidth' },
          },
          hover: { opacity: { value: 0.6 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { cornerRadius: 0, tl: 40, tr: 0, br: 40, bl: 0 },
    { cornerRadius: 30, tl: 0, tr: 40, br: 0, bl: 40 },
    { cornerRadius: 50, tl: 50, tr: 50, br: 0, bl: 0 },
    { cornerRadius: 8, tl: 0, tr: 0, br: 50, bl: 50 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
