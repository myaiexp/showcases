// An ordinal scale whose range comes from a data reference, so swapping the palette recolours the chart
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400, height: 180, padding: 5,
    signals: [{ name: 'palette', value: 'sunset', bind: { input: 'select', options: ['sunset', 'ocean', 'forest', 'candy'] } }],
    data: [
      {
        name: 'palettes',
        values: [
          ...['#ffd166', '#f9a03f', '#ef6f3c', '#d1495b', '#8c3b6e', '#4a2c5e'].map((color) => ({ set: 'sunset', color })),
          ...['#caf0f8', '#90e0ef', '#48cae4', '#0096c7', '#0077b6', '#023e8a'].map((color) => ({ set: 'ocean', color })),
          ...['#d8f3dc', '#b7e4c7', '#74c69d', '#52b788', '#2d6a4f', '#1b4332'].map((color) => ({ set: 'forest', color })),
          ...['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9', '#ffb3a7'].map((color) => ({ set: 'candy', color })),
        ],
      },
      { name: 'pick', source: 'palettes', transform: [{ type: 'filter', expr: 'datum.set === palette' }] },
      { name: 'table', values: [{ c: 'A', v: 28 }, { c: 'B', v: 55 }, { c: 'C', v: 43 }, { c: 'D', v: 91 }, { c: 'E', v: 81 }, { c: 'F', v: 53 }] },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'c' }, range: 'width', padding: 0.1 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      // For ordinal scales only: the range is the values of a field, in data order.
      { name: 'color', type: 'ordinal', domain: { data: 'table', field: 'c' }, range: { data: 'pick', field: 'color' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    marks: [{
      type: 'rect', from: { data: 'table' },
      encode: { update: {
        x: { scale: 'x', field: 'c' }, width: { scale: 'x', band: 1 },
        y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'color', field: 'c' },
      } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, ['sunset', 'ocean', 'forest', 'candy'].map((palette) => ({ palette })), 1400);
  return () => stage.dispose();
};

export default mount;
