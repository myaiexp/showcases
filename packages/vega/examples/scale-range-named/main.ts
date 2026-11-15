// Scale ranges given as a name: category, ordinal, ramp, heatmap, diverging and symbol
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 190, padding: 5,
    signals: [{ name: 'cells', value: 10, bind: { input: 'range', min: 3, max: 10, step: 1 } }],
    data: [{
      name: 'cells',
      transform: [{ type: 'sequence', start: 0, stop: 10, as: 'n' }, { type: 'filter', expr: 'datum.n < cells' }],
    }],
    scales: [
      { name: 'x', type: 'band', domain: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], range: 'width', padding: 0.08 },
      { name: 'row', type: 'band', domain: ['category', 'ordinal', 'ramp', 'heatmap', 'diverging', 'symbol'], range: 'height', padding: 0.15 },
      // Each range below is just a name; the config decides what it means.
      { name: 'category', type: 'ordinal', domain: { data: 'cells', field: 'n' }, range: 'category' },
      { name: 'ordinal', type: 'ordinal', domain: { data: 'cells', field: 'n' }, range: 'ordinal' },
      { name: 'ramp', type: 'linear', domain: [0, { signal: 'cells - 1' }], range: 'ramp' },
      { name: 'heatmap', type: 'linear', domain: [0, { signal: 'cells - 1' }], range: 'heatmap' },
      { name: 'diverging', type: 'linear', domain: [0, { signal: 'cells - 1' }], domainMid: { signal: '(cells - 1) / 2' }, range: 'diverging' },
      { name: 'symbol', type: 'ordinal', domain: { data: 'cells', field: 'n' }, range: 'symbol' },
    ],
    axes: [{ orient: 'left', scale: 'row', ticks: false, domain: false }],
    marks: [
      ...['category', 'ordinal', 'ramp', 'heatmap', 'diverging'].map((s) => ({
        type: 'rect' as const, from: { data: 'cells' },
        encode: { update: {
          x: { scale: 'x', field: 'n' }, width: { scale: 'x', band: 1 },
          y: { scale: 'row', value: s }, height: { scale: 'row', band: 1 }, fill: { scale: s, field: 'n' },
        } },
      })),
      {
        type: 'symbol', from: { data: 'cells' },
        encode: { update: {
          x: { scale: 'x', field: 'n', band: 0.5 }, y: { scale: 'row', value: 'symbol', band: 0.5 },
          shape: { scale: 'symbol', field: 'n' }, size: { value: 150 }, fill: { value: 'steelblue' },
        } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ cells: 10 }, { cells: 5 }, { cells: 3 }, { cells: 8 }], 1400);
  return () => stage.dispose();
};

export default mount;
