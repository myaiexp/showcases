// escapeFormulae as a RegExp guards = and @ only, so -5 stays a number
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { jsonEditor, sheetView } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

// A budget typed into a form (so every value is text): a refund next to real formulas.
const BUDGET: Grid = [
  ['Item', 'Change'],
  ['Refund', '-5'],
  ['Rent', '=B2*2'],
  ['Lookup', '@SUM(A1)'],
];

const GUARDS: { label: string; rule: boolean | RegExp; say: string }[] = [
  { label: 'true (guards = + - @)', rule: true, say: 'true: the refund -5 becomes text too.' },
  { label: '/^[=@]/ (only = and @)', rule: /^[=@]/, say: '/^[=@]/: -5 stays a real number.' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the two settings. Edit the rows: numbers stay numbers, text starting with = is guarded.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.unparse(rows, { escapeFormulae })', to: 'Opened in a spreadsheet' });
  let rows: Grid = stage.preview ? BUDGET.slice(0, 3) : BUDGET;

  const unparse = (guard: (typeof GUARDS)[number]): void => {
    // A RegExp replaces the default test: cells that match it get the leading '
    const csv = Papa.unparse(rows, { escapeFormulae: guard.rule });
    f.from.show(csvView(csv));
    f.to.show(sheetView(csv, stage.preview ? '' : 'What the spreadsheet shows'));
    const runs = f.to.body.querySelectorAll('.pp-sheet-run').length;
    stage.say(runs ? `${guard.say} (${runs} would still run)` : guard.say, runs ? 'warn' : 'ok');
  };

  if (stage.preview) {
    stage.cycle(GUARDS, 3000, (g) => {
      unparse(g);
      revealRows(f.to.body);
    });
  } else {
    let guard = GUARDS[1]!;
    select(stage.bar!, 'escapeFormulae', GUARDS.map((g) => [g, g.label] as const), (g) => {
      guard = g;
      unparse(g);
    }, guard);
    stage.root.prepend(jsonEditor(BUDGET, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(guard);
      }
    }, 6).el);
    unparse(guard);
  }
  return stage.dispose;
};

export default mount;
