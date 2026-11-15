// Data functions: data() hands a data set to array functions, so a caption can summarise live rows
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { reshuffle } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): { k: string; v: number }[] => {
  const rand = rng(300 + n * 17);
  return Array.from({ length: 6 + Math.floor(rand() * 7) }, (_, i) => ({ k: String.fromCharCode(65 + i), v: Math.round(10 + rand() * 90) }));
};

const rows: ExprRow[] = [
  { head: "vals = pluck(data('table'), 'v')" },
  'length(data("table"))',
  'extent(vals)',
  'span(extent(vals))',
  'peek(sort(vals))',
  'sort(vals)[0]',
  'format(sum / length(vals), ".1f")',
  'join(slice(sort(vals), -3), ", ")',
  { expr: 'indata("table", "v", peek(sort(vals))) ? "yes" : "no"', label: 'indata("table", "v", max)' },
  'length(data("nothing"))',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 190,
    padding: 8,
    data: [
      { name: 'table', values: make(1) },
      // A derived total: each row adds its value, and the last row holds the running sum.
      { name: 'total', source: 'table', transform: [{ type: 'aggregate', fields: ['v'], ops: ['sum'], as: ['sum'] }] },
    ],
    signals: [
      { name: 'vals', update: "pluck(data('table'), 'v')" },
      { name: 'sum', update: "data('total')[0] ? data('total')[0].sum : 0" },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.12 },
      { name: 'y', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'k' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
            fill: { signal: "datum.v === peek(sort(vals)) ? 'orange' : 'steelblue'" },
          },
        },
      },
      { type: 'group', encode: { enter: { x: { value: 300 }, y: { value: 0 } } }, marks: exprMarks(rows, { labelWidth: 220, resultWidth: 90 }) },
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'table', make, 1700);
  return () => stage.dispose();
};

export default mount;
