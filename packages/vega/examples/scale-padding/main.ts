// padding widens a quantitative domain by a number of pixels at each end of the range
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(14);
  const values = [{ a: 10, b: 20 }, { a: 90, b: 80 }, ...Array.from({ length: 24 }, () => ({ a: 10 + rand() * 80, b: 15 + rand() * 70 }))];

  const spec: Spec = {
    width: 420, height: 180, padding: 5,
    signals: [{ name: 'pad', value: 0, bind: { input: 'range', min: 0, max: 60, step: 5, name: 'padding (px)' } }],
    data: [{ name: 'table', values }],
    scales: [
      { name: 'x', type: 'linear', zero: false, domain: { data: 'table', field: 'a' }, range: 'width', padding: { signal: 'pad' } },
      { name: 'y', type: 'linear', zero: false, domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    marks: [
      { type: 'rect', encode: { update: { x: { value: 0 }, x2: { signal: 'width' }, y: { value: 0 }, y2: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.06 } } } },
      {
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'a' }, y: { scale: 'y', field: 'b' }, size: { value: 300 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.7 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ pad: 0 }, { pad: 30 }, { pad: 60 }, { pad: 15 }], 1400);
  return () => stage.dispose();
};

export default mount;
