// Cross: every pair of rows from one stream, and the same pairs narrowed by a filter expression
import type { Mark, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const panels = [
  { data: 'all', label: 'no filter' },
  { data: 'distinct', label: 'datum.a.v !== datum.b.v' },
  { data: 'ordered', label: 'datum.a.v < datum.b.v' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 150,
    padding: 5,
    signals: [{ name: 'n', value: 5, bind: { input: 'range', min: 2, max: 6, step: 1 } }],
    data: [
      { name: 'nums', values: [1, 2, 3, 4, 5, 6].map((v) => ({ v })) },
      { name: 'few', source: 'nums', transform: [{ type: 'filter', expr: 'datum.v <= n' }] },
      // The cross filter sees each pair as datum.a and datum.b. (It cannot read signals; see the filter above.)
      { name: 'all', source: 'few', transform: [{ type: 'cross' }] },
      { name: 'distinct', source: 'few', transform: [{ type: 'cross', filter: 'datum.a.v !== datum.b.v' }] },
      { name: 'ordered', source: 'few', transform: [{ type: 'cross', filter: 'datum.a.v < datum.b.v' }] },
    ],
    scales: [{ name: 'k', type: 'band', domain: [1, 2, 3, 4, 5, 6], range: [0, 120], padding: 0.08 }],
    marks: panels.map((p, i): Mark => ({
      type: 'group',
      encode: { enter: { x: { value: i * 160 }, y: { value: 18 } } },
      marks: [
        {
          type: 'text',
          encode: {
            enter: { x: { value: 0 }, y: { value: -6 }, fill: { value: '#aaa' }, fontSize: { value: 10 }, text: { value: p.label } },
          },
        },
        {
          type: 'text',
          encode: {
            update: { x: { value: 0 }, y: { value: 136 }, fill: { value: '#ddd' }, fontSize: { value: 12 }, text: { signal: `length(data('${p.data}')) + ' pairs'` } },
          },
        },
        {
          type: 'rect',
          from: { data: p.data },
          encode: {
            update: {
              x: { scale: 'k', field: 'a.v' },
              y: { scale: 'k', field: 'b.v' },
              width: { scale: 'k', band: 1 },
              height: { scale: 'k', band: 1 },
              fill: { value: ['steelblue', 'orange', 'seagreen'][i]! },
            },
          },
        },
      ],
    })),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'n', [2, 3, 4, 5, 6, 4], 1300);
  return () => stage.dispose();
};

export default mount;
