// Layout align: none flows, each aligns a grid of variable cells, all sizes every cell alike
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const SIZES = [[70, 40], [40, 70], [90, 30], [50, 55], [30, 30], [80, 60]];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    padding: 5,

    signals: [
      { name: 'rowAlign', value: 'each', bind: { input: 'select', options: ['all', 'each', 'none'], name: 'align.row' } },
      { name: 'colAlign', value: 'each', bind: { input: 'select', options: ['all', 'each', 'none'], name: 'align.column' } },
    ],

    // align takes a string for both directions or a {row, column} object, as here.
    // none: a flow layout. each: a clean grid, each row or column its own size.
    // all: a grid whose rows or columns share the largest size.
    layout: { columns: 3, padding: 10, align: { row: { signal: 'rowAlign' }, column: { signal: 'colAlign' } } },

    data: [{ name: 'panels', values: SIZES.map(([w, h], i) => ({ w, h, i })) }],

    marks: [
      {
        type: 'group',
        from: { data: 'panels' },
        encode: {
          update: {
            width: { field: 'w' },
            height: { field: 'h' },
            fill: { signal: "scale('c', datum.i)" },
            fillOpacity: { value: 0.55 },
            stroke: { value: '#ccd' },
          },
        },
        marks: [
          {
            type: 'text',
            encode: {
              update: {
                x: { value: 4 },
                y: { value: 4 },
                baseline: { value: 'top' },
                fontSize: { value: 10 },
                text: { signal: "parent.w + 'x' + parent.h" },
              },
            },
          },
        ],
      },
    ],
    scales: [{ name: 'c', type: 'ordinal', domain: [0, 1, 2, 3, 4, 5], range: { scheme: 'tableau10' } }],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { rowAlign: 'all', colAlign: 'all' },
      { rowAlign: 'none', colAlign: 'none' },
      { rowAlign: 'each', colAlign: 'all' },
      { rowAlign: 'all', colAlign: 'each' },
      { rowAlign: 'each', colAlign: 'each' },
    ],
    1500,
  );
  return () => stage.dispose();
};

export default mount;
