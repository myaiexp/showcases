// clamp keeps outputs inside the range; without it values outside the domain extrapolate
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 100, padding: 5,
    signals: [{ name: 'clamp', value: false, bind: { input: 'checkbox' } }],
    data: [{ name: 'vals', transform: [{ type: 'sequence', start: -20, stop: 125, step: 5, as: 'v' }] }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: [120, 320], clamp: { signal: 'clamp' } },
    ],
    marks: [
      { type: 'rect', encode: { update: { x: { scale: 'x', value: 0 }, x2: { scale: 'x', value: 100 }, y: { value: 10 }, y2: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.1 } } } },
      {
        type: 'symbol', from: { data: 'vals' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { signal: 'height / 2 + 5' }, size: { value: 80 }, fill: { signal: "datum.v < 0 || datum.v > 100 ? 'orange' : 'steelblue'" }, fillOpacity: { value: 0.7 } } },
      },
      { type: 'text', encode: { update: { x: { value: 4 }, y: { value: 8 }, text: { signal: "'clamp: ' + clamp" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ clamp: false }, { clamp: true }], 1700);
  return () => stage.dispose();
};

export default mount;
