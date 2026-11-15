// Array functions: indexof, lastindexof, length, peek, slice, reverse, sort, join, pluck and span on one array
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const arrays = [
  [5, 3, 8, 3, 1, 9],
  [40, 10, 30, 20],
  [2, 2, 2, 7, 2],
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
];

const rows: ExprRow[] = [
  { head: 'arr is the chosen array; recs is [{a: {b: 4}}, {a: {b: 9}}]' },
  'arr',
  'length(arr)',
  'peek(arr)',
  'indexof(arr, 3)',
  'lastindexof(arr, 3)',
  'slice(arr, 1, -1)',
  'reverse(arr)',
  'sort(arr)',
  'join(sort(arr), " < ")',
  'span(arr)',
  'pluck(recs, "a.b")',
  'span(pluck(recs, "a.b"))',
];
const opts = { labelWidth: 240, resultWidth: 180 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'lists', value: arrays },
      { name: 'pick', value: 0, bind: { input: 'select', options: [0, 1, 2, 3], labels: arrays.map((a) => `[${a.join(', ')}]`) } },
      { name: 'arr', update: 'lists[pick]' },
      { name: 'recs', value: [{ a: { b: 4 } }, { a: { b: 9 } }] },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'pick', [0, 1, 2, 3], 1500);
  return () => stage.dispose();
};

export default mount;
