// A group is a filled box; clip, corner radius and stroke order are channels
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260, height: 220, padding: 5, autosize: 'none',
    signals: [
      { name: 'clip', value: false, bind: { input: 'checkbox' } },
      { name: 'foreground', value: false, bind: { input: 'checkbox' } },
      { name: 'x', value: 25, bind: { input: 'range', min: 0, max: 200, step: 1 } },
      { name: 'y', value: 25, bind: { input: 'range', min: 0, max: 200, step: 1 } },
      { name: 'w', value: 150, bind: { input: 'range', min: 0, max: 200, step: 1 } },
      { name: 'h', value: 130, bind: { input: 'range', min: 0, max: 200, step: 1 } },
      { name: 'cornerRadius', value: 0, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'strokeWidth', value: 4, bind: { input: 'range', min: 0, max: 10 } },
    ],
    marks: [{
      type: 'group',
      encode: {
        update: {
          x: { signal: 'x' }, y: { signal: 'y' }, width: { signal: 'w' }, height: { signal: 'h' },
          clip: { signal: 'clip' }, cornerRadius: { signal: 'cornerRadius' },
          strokeWidth: { signal: 'strokeWidth' }, strokeForeground: { signal: 'foreground' },
          fill: { value: '#2a3140' }, stroke: { value: 'orange' },
        },
        hover: { opacity: { value: 0.6 } },
      },
      data: [{ name: 'table', values: [{ x: 5, y: 5, w: 100, h: 30 }, { x: -5, y: 70, w: 40, h: 40 }, { x: 60, y: 90, w: 140, h: 20 }] }],
      marks: [{
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: { x: { field: 'x' }, y: { field: 'y' }, width: { field: 'w' }, height: { field: 'h' }, stroke: { value: 'tomato' } },
          update: { fill: { value: '#9ec5e8' } },
          hover: { fill: { value: 'salmon' } },
        },
      }],
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { clip: false, foreground: false, cornerRadius: 0, w: 150, h: 130 },
    { clip: true, foreground: false, cornerRadius: 0, w: 150, h: 130 },
    { clip: true, foreground: true, cornerRadius: 28, w: 120, h: 150 },
    { clip: false, foreground: true, cornerRadius: 14, w: 190, h: 100 },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
