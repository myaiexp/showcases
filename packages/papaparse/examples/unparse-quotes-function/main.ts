// quotes as a function decides per value: quote the text, not the numbers
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];
type Rule = { code: string; test: (value: unknown, col: number) => boolean; say: string };

const ORDER: Grid = [
  ['Item', 'Qty', 'Price'],
  ['Mug', 2, 6.5],
  ['Tea', 1, 4],
];

// Papa calls the function for every value with the value and its column number.
const RULES: Rule[] = [
  { code: "typeof value === 'string'", test: (v) => typeof v === 'string', say: 'Text is quoted, numbers stay bare.' },
  { code: "typeof value === 'number'", test: (v) => typeof v === 'number', say: 'Only the numbers are quoted.' },
  { code: 'col === 0', test: (_v, col) => col === 0, say: 'Only the first column is quoted.' },
  { code: 'String(value).length > 3', test: (v) => String(v).length > 3, say: 'Only values longer than 3 characters.' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a rule. Edit the JSON to see which values it catches.' });
  const f = flow(stage, { from: 'Order rows', via: 'Papa.unparse(rows, { quotes: fn })', to: 'CSV text' });
  let rows: Grid = ORDER;
  let current = RULES[0]!;

  const unparse = (rule: Rule): void => {
    const csv = Papa.unparse(rows, { quotes: (value, col) => rule.test(value, col) });
    f.to.show(csvView(csv));
    stage.say(stage.preview ? rule.say : `(value, col) => ${rule.code}: ${rule.say}`, 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(rows, { numbered: false }));
    stage.cycle(RULES, 2800, unparse);
  } else {
    f.from.show(jsonEditor(ORDER, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(current);
      }
    }, 6).el);
    select(stage.bar!, 'quotes rule', RULES.map((r) => [r, r.code] as const), (r) => {
      current = r;
      unparse(r);
    });
    unparse(current);
  }
  return stage.dispose;
};

export default mount;
