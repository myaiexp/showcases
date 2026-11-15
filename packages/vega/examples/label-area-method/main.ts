// Labels on area marks: naive, reduced-search and floodfill look for the roomiest spot differently
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(31);
  const values = ['wind', 'solar', 'hydro', 'gas'].flatMap((c, k) =>
    Array.from({ length: 12 }, (_, x) => ({ c, x, y: Math.round(10 + 14 * (1 + Math.sin(x / 2 + k * 1.7)) + rand() * 6) })),
  );

  const spec: Spec = {
    width: 400,
    height: 240,
    padding: 5,
    signals: [{ name: 'method', value: 'floodfill', bind: { input: 'select', options: ['naive', 'reduced-search', 'floodfill'] } }],
    data: [
      {
        name: 'table',
        values,
        transform: [{ type: 'stack', groupby: ['x'], field: 'y', sort: { field: 'c' }, as: ['y0', 'y1'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 11], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'table', field: 'y1' }, range: 'height', nice: true },
      { name: 'color', type: 'ordinal', domain: ['wind', 'solar', 'hydro', 'gas'], range: { scheme: 'tableau10' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      {
        name: 'areas',
        type: 'group',
        from: { facet: { name: 'series', data: 'table', groupby: 'c' } },
        marks: [
          {
            type: 'area',
            from: { data: 'series' },
            encode: {
              enter: {
                x: { scale: 'x', field: 'x' },
                y: { scale: 'y', field: 'y0' },
                y2: { scale: 'y', field: 'y1' },
                fill: { scale: 'color', field: 'c' },
                fillOpacity: { value: 0.8 },
              },
            },
          },
        ],
      },
      {
        type: 'text',
        from: { data: 'areas' },
        encode: { enter: { text: { field: 'datum.c' }, fontSize: { value: 13 }, fontWeight: { value: 'bold' }, fill: { value: '#fff' } } },
        transform: [{ type: 'label', method: { signal: 'method' } as never, size: [{ signal: 'width' }, { signal: 'height' }] }],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'method', ['naive', 'reduced-search', 'floodfill'], 1800);
  return () => stage.dispose();
};

export default mount;
