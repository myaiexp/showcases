// Seven ways to place a symbol: value, field, scale, mult, offset, exponent
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460, height: 240, padding: { left: 5, right: 5, top: 5, bottom: 40 },
    signals: [
      { name: 'k', value: 1, bind: { input: 'range', min: 0.4, max: 1.6, step: 0.05 } },
      { name: 'dy', value: 0, bind: { input: 'range', min: -80, max: 80, step: 1 } },
      { name: 'pw', value: 1.5, bind: { input: 'range', min: 1, max: 2.2, step: 0.05 } },
      { name: 'sy', value: 120, bind: { input: 'range', min: 20, max: 220, step: 1 } },
    ],
    // One row: p is a pixel height, v a data value, e the base of an exponent.
    data: [
      { name: 'one', values: [{ p: 120, v: 4, e: 9 }] },
      { name: 'names', values: ['value', 'field', 'scale', 'mult', 'offset', 'exponent', 'signal'].map((n) => ({ n })) },
    ],
    scales: [
      { name: 'cols', type: 'band', domain: { data: 'names', field: 'n' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 10], range: 'height' },
    ],
    marks: [
      { type: 'rule', encode: { enter: { x: { value: 0 }, x2: { signal: 'width' }, y: { value: 120 }, stroke: { value: '#555' }, strokeDash: { value: [2, 3] } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: '#8a93a6' }, size: { value: 260 },
        x: { scale: 'cols', value: 'value', band: 0.5 }, y: { value: 120 } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: '#8a93a6' }, size: { value: 260 },
        x: { scale: 'cols', value: 'field', band: 0.5 }, y: { field: 'p' } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: '#8a93a6' }, size: { value: 260 },
        x: { scale: 'cols', value: 'scale', band: 0.5 }, y: { scale: 'y', field: 'v', mult: { signal: 'k' } } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: 'orange' }, size: { value: 260 },
        x: { scale: 'cols', value: 'mult', band: 0.5 }, y: { field: 'p', mult: { signal: 'k' } } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: 'orange' }, size: { value: 260 },
        x: { scale: 'cols', value: 'offset', band: 0.5 }, y: { field: 'p', offset: { signal: 'dy' } } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: 'orange' }, size: { value: 260 },
        x: { scale: 'cols', value: 'exponent', band: 0.5 }, y: { field: 'e', exponent: { signal: 'pw' } } } } },
      { type: 'symbol', from: { data: 'one' }, encode: { update: { fill: { value: 'orange' }, size: { value: 260 },
        x: { scale: 'cols', value: 'signal', band: 0.5 }, y: { signal: 'sy' } } } },
      {
        type: 'text',
        from: { data: 'names' },
        encode: {
          update: {
            x: { scale: 'cols', field: 'n', band: 0.5 }, y: { signal: 'height + 18' },
            align: { value: 'center' }, text: { field: 'n' }, fontSize: { value: 12 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ k: 0.6, dy: -50, pw: 1.2, sy: 60 }, { k: 1.4, dy: 50, pw: 2, sy: 200 }, { k: 1, dy: 0, pw: 1.5, sy: 120 }], 1300);
  return () => stage.dispose();
};

export default mount;
