// skipEmptyLines drops empty rows (true) and blank rows too (greedy)
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];
type Mode = false | true | 'greedy';

// A sign-up sheet where one row is empty and one holds only spaces.
const SHEET: Grid = [
  ['Ada', 'A1'],
  [''],
  ['  ', '  '],
];

const MODES: readonly (readonly [Mode, string])[] = [
  [false, 'false (keep everything)'],
  [true, 'true (drop empty rows)'],
  ['greedy', "'greedy' (drop blank rows too)"],
];

/** Mirrors the docs' rule, only to fade the rows that are expected to disappear. */
const dropped = (row: unknown[], mode: Mode): boolean =>
  mode === 'greedy' ? row.join('').trim() === '' : mode === true && row.length === 1 && row[0] === '';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Faded rows are the ones the setting removes. Add your own empty or blank rows.' });
  const f = flow(stage, { from: 'Sign-up rows', via: 'Papa.unparse(rows, { skipEmptyLines })', to: 'CSV text' });
  let rows: Grid = SHEET;

  const unparse = (mode: Mode): void => {
    // true skips rows that are empty; 'greedy' also skips rows holding only whitespace
    const csv = Papa.unparse(rows, { skipEmptyLines: mode });
    f.from.show(dataTable(rows, { numbered: false, rowClass: (r) => (dropped(r as unknown[], mode) ? 'pp-dim' : undefined) }));
    f.to.show(
      csvView(csv, {
        lineClass: (_i, line) => (line.pieces.map((p) => (p.kind === 'text' ? p.text : '')).join('').trim() === '' ? 'pp-bad' : undefined),
      }),
    );
    const said: Record<string, string> = {
      false: 'false: empty and blank rows stay as junk.',
      true: 'true: empty row gone; spaces-only stays.',
      greedy: "'greedy': both go; only Ada's row is left.",
    };
    stage.say(said[String(mode)]!, mode === false ? 'warn' : 'ok');
  };

  if (stage.preview) {
    stage.cycle(MODES, 3000, ([mode]) => {
      unparse(mode);
      revealRows(f.to.body);
    });
  } else {
    let mode: Mode = true;
    select(stage.bar!, 'skipEmptyLines', MODES, (m) => {
      mode = m;
      unparse(m);
    }, mode);
    f.from.show(jsonEditor(SHEET, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(mode);
      }
    }, 6).el);
    unparse(mode);
  }
  return stage.dispose;
};

export default mount;
