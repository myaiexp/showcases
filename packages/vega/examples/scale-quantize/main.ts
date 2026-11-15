// Quantize scale: skewed values coloured into equal-width segments of the domain
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(7);
  const values = Array.from({ length: 60 }, () => ({ v: Math.round(Math.pow(rand(), 2.6) * 1000) / 10, j: rand() }));

  const spec: Spec = {
    width: 440, height: 130, padding: 5,
    signals: [{ name: 'k', value: 5, bind: { input: 'range', min: 3, max: 8, step: 1, name: 'colours' } }],
    data: [{ name: 'table', values }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1], range: [20, 100] },
      // Uniform slices of [min, max]; nice rounds the ends so the slice edges are tidy.
      { name: 'color', type: 'quantize', nice: true, domain: { data: 'table', field: 'v' }, range: { scheme: 'blues', count: { signal: 'k' } } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    legends: [{ fill: 'color', orient: 'top', direction: 'horizontal', title: 'quantize' }],
    marks: [{
      type: 'symbol', from: { data: 'table' },
      encode: { update: { x: { scale: 'x', field: 'v' }, y: { scale: 'y', field: 'j' }, size: { value: 80 }, fill: { scale: 'color', field: 'v' }, fillOpacity: { value: 0.95 } } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ k: 5 }, { k: 3 }, { k: 8 }, { k: 4 }, { k: 6 }], 1500);
  return () => stage.dispose();
};

export default mount;
