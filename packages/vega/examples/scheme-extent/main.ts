// extent rescales which part of a continuous scheme is used, and a reversed extent flips it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 110, padding: 5,
    signals: [
      { name: 'lo', value: 0.25, bind: { input: 'range', min: 0, max: 1, step: 0.05, name: 'extent start' } },
      { name: 'hi', value: 1, bind: { input: 'range', min: 0, max: 1, step: 0.05, name: 'extent end' } },
    ],
    data: [{ name: 'cols', transform: [{ type: 'sequence', start: 0, stop: 60, as: 'n' }, { type: 'formula', as: 'u', expr: 'datum.n / 59' }] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'cols', field: 'n' }, range: 'width' },
      { name: 'full', type: 'linear', domain: [0, 1], range: { scheme: 'viridis' } },
      { name: 'part', type: 'linear', domain: [0, 1], range: { scheme: 'viridis', extent: [{ signal: 'lo' }, { signal: 'hi' }] } },
    ],
    marks: [
      {
        type: 'rect', from: { data: 'cols' },
        encode: { update: { x: { scale: 'x', field: 'n' }, width: { scale: 'x', band: 1 }, y: { value: 16 }, height: { value: 28 }, fill: { scale: 'full', field: 'u' } } },
      },
      {
        type: 'rect', from: { data: 'cols' },
        encode: { update: { x: { scale: 'x', field: 'n' }, width: { scale: 'x', band: 1 }, y: { value: 66 }, height: { value: 28 }, fill: { scale: 'part', field: 'u' } } },
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 8 }, text: { value: 'scheme viridis' }, fill: { value: '#aaa' }, fontSize: { value: 10 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 58 }, text: { signal: "'extent [' + lo + ', ' + hi + ']'" }, fill: { value: '#ddd' }, fontSize: { value: 10 } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ lo: 0, hi: 1 }, { lo: 0.25, hi: 1 }, { lo: 0, hi: 0.5 }, { lo: 1, hi: 0 }, { lo: 0.8, hi: 0.2 }], 1400);
  return () => stage.dispose();
};

export default mount;
