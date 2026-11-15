// Window ranking ops: rank, dense_rank, row_number, percent_rank, cume_dist and ntile over sorted rows
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const ops = ['row_number', 'rank', 'dense_rank', 'percent_rank', 'cume_dist', 'ntile'];
// Ties on purpose: 9, 9 and 7, 7 and 7.
const scores = [14, 9, 9, 12, 7, 7, 7, 3, 12].map((score, i) => ({ id: 'abcdefghi'[i], score }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 190,
    padding: 5,
    signals: [
      { name: 'op', value: 'rank', bind: { input: 'select', options: ops } },
      // ntile takes a parameter (the bucket count); the others take none.
      { name: 'param', update: "op == 'ntile' ? 3 : null" },
    ],
    data: [
      { name: 'scores', values: scores },
      {
        name: 'ranked',
        source: 'scores',
        transform: [
          // Rows tied under the sort are peers: they get the same rank.
          { type: 'window', sort: { field: 'score', order: 'descending' }, ops: [{ signal: 'op' }], params: [{ signal: 'param' }], fields: [null], as: ['out'] },
        ],
      },
      rowsOf('rows', 'ranked', 9),
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'ranked', field: 'id' }, range: 'height', padding: 0.15 },
      { name: 'x', type: 'linear', domain: [0, 16], range: 'width' },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', title: 'score' }],
    title: { text: { signal: "'window op: ' + op + (op == 'ntile' ? '(3)' : '')" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'ranked' },
        encode: {
          update: {
            y: { scale: 'y', field: 'id' },
            height: { scale: 'y', band: 1 },
            x: { value: 0 },
            x2: { scale: 'x', field: 'score' },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'ranked' },
        encode: {
          update: {
            y: { scale: 'y', field: 'id', band: 0.5 },
            x: { scale: 'x', field: 'score', offset: 5 },
            text: { signal: "isNumber(datum.out) ? format(datum.out, '.2~f') : ''" },
            baseline: { value: 'middle' },
            fill: { value: 'orange' },
            fontWeight: { value: 'bold' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'id', width: 24 }, { field: 'score', width: 44 }, { field: 'out' }], { gap: 70 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'op', ops, 1600);
  return () => stage.dispose();
};

export default mount;
