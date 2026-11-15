// Power scale: the exponent signal bends a diagonal into a curve
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360, height: 240, padding: 5,
    signals: [{ name: 'k', value: 2, bind: { input: 'range', min: 0.25, max: 3, step: 0.25, name: 'exponent' } }],
    data: [{ name: 'pts', transform: [{ type: 'sequence', start: 0, stop: 21, as: 'v' }] }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 20], range: 'width' },
      // y = m * v^k + b, with the exponent taken from the signal.
      { name: 'y', type: 'pow', exponent: { signal: 'k' }, domain: [0, 20], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', title: 'value' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2, title: 'pow(value)' },
    ],
    marks: [
      {
        type: 'symbol', from: { data: 'pts' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { scale: 'y', field: 'v' }, size: { value: 70 }, fill: { value: 'steelblue' } } },
      },
      { type: 'text', encode: { update: { x: { value: 8 }, y: { value: 10 }, text: { signal: "'exponent ' + k" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ k: 0.5 }, { k: 1 }, { k: 2 }, { k: 3 }, { k: 1.5 }], 1400);
  return () => stage.dispose();
};

export default mount;
