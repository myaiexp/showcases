// The path channel can come from a data field, so each row draws its own outline
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 130, padding: 5,
    signals: [
      { name: 'angle', value: 0, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'k', value: 1, bind: { input: 'range', min: 0.4, max: 1.6, step: 0.05 } },
    ],
    data: [{
      name: 'shapes',
      values: [
        { x: 55, name: 'arrow', path: 'M-30,-10 H10 V-25 L35,0 L10,25 V10 H-30 Z', color: '#4fa3e0' },
        { x: 165, name: 'house', path: 'M-28,25 V-5 L0,-30 L28,-5 V25 Z', color: '#f59e0b' },
        { x: 275, name: 'bolt', path: 'M5,-32 L-22,6 H-2 L-8,32 L24,-8 H3 Z', color: '#7fd18b' },
        { x: 385, name: 'heart', path: 'M0,28 C-45,-5 -22,-35 0,-14 C22,-35 45,-5 0,28 Z', color: '#e07fb0' },
      ],
    }],
    marks: [
      {
        type: 'path',
        from: { data: 'shapes' },
        encode: {
          enter: { x: { field: 'x' }, y: { signal: 'height / 2' }, fill: { field: 'color' }, stroke: { value: '#fff' }, strokeWidth: { value: 1.5 } },
          update: { path: { field: 'path' }, angle: { signal: 'angle' }, scaleX: { signal: 'k' }, scaleY: { signal: 'k' } },
          hover: { fillOpacity: { value: 0.6 } },
        },
      },
      { type: 'text', interactive: false, from: { data: 'shapes' }, encode: { update: { x: { field: 'x' }, y: { signal: 'height - 2' }, align: { value: 'center' }, text: { field: 'name' }, fontSize: { value: 11 } } } },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ angle: 0, k: 1 }, { angle: 90, k: 1.4 }, { angle: 180, k: 0.7 }, { angle: -90, k: 1.1 }], 1300);
  return () => stage.dispose();
};

export default mount;
