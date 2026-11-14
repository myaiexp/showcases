// quoteChar swaps the quote mark: single quotes wrap values, inner ones double
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

const ROWS: Grid = [
  ['Name', 'City'],
  ["O'Neil, Ann", 'Cork, IE'],
  ['Bruno', 'Lyon'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type another quote character, such as ` or ~. Try one that is also in a value.' });
  const f = flow(stage, { from: 'Names', via: 'Papa.unparse(rows, { quoteChar })', to: 'CSV text' });
  let rows: Grid = ROWS;

  const unparse = (quoteChar: string): void => {
    // The character that wraps a value (and that gets doubled when it appears inside one).
    const csv = Papa.unparse(rows, quoteChar ? { quoteChar } : {});
    f.to.show(csvView(csv, { quoteChar: quoteChar || '"', lineClass: (i) => (i === 1 ? 'pp-hit' : undefined) }));
    const shown = quoteChar || '"';
    if (shown === '"') stage.say('The default: values wrapped in " quote marks.');
    else stage.say(stage.preview ? `quoteChar ${shown}: the inner ${shown} is doubled.` : `quoteChar: ${shown} wraps the values; the one in O${shown}Neil is doubled.`, 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(ROWS, { numbered: false }));
    stage.cycle(['"', "'"], 2800, (q) => {
      unparse(q);
      revealRows(f.to.body);
    });
  } else {
    let q = "'";
    textInput(stage.bar!, 'quoteChar', q, (v) => {
      q = v;
      unparse(q);
    }, 3);
    f.from.show(jsonEditor(ROWS, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(q);
      }
    }, 6).el);
    unparse(q);
  }
  return stage.dispose;
};

export default mount;
