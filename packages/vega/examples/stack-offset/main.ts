// stack offsets: zero piles from the axis, center makes a streamgraph, normalize fills 0 to 1
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(17);
  const values = ['north', 'south', 'east', 'west'].flatMap((g, k) =>
    Array.from({ length: 14 }, (_, x) => ({ g, x, y: Math.round(8 + 10 * (1 + Math.sin(x / 2.2 + k * 1.4)) + rand() * 4) })),
  );

  const spec: Spec = {
    width: 420,
    height: 230,
    padding: 5,
    signals: [{ name: 'offset', value: 'center', bind: { input: 'select', options: ['zero', 'center', 'normalize'] } }],
    data: [
      {
        name: 'table',
        values,
        transform: [{ type: 'stack', groupby: ['x'], field: 'y', offset: { signal: 'offset' }, sort: { field: 'g' } }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 13], range: 'width' },
      // Both stack outputs feed the domain: center and normalize leave y0 below zero or above its usual place.
      { name: 'y', type: 'linear', domain: { data: 'table', fields: ['y0', 'y1'] }, range: 'height', nice: true, zero: false },
      { name: 'color', type: 'ordinal', domain: ['north', 'south', 'east', 'west'], range: { scheme: 'tableau10' } },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y' },
    ],
    marks: [
      {
        type: 'group',
        from: { facet: { name: 'series', data: 'table', groupby: 'g' } },
        marks: [
          {
            type: 'area',
            from: { data: 'series' },
            encode: {
              update: {
                x: { scale: 'x', field: 'x' },
                y: { scale: 'y', field: 'y0' },
                y2: { scale: 'y', field: 'y1' },
                fill: { scale: 'color', field: 'g' },
                fillOpacity: { value: 0.85 },
              },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'offset', ['zero', 'center', 'normalize'], 1900);
  return () => stage.dispose();
};

export default mount;
