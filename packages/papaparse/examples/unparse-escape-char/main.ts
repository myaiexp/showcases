// escapeChar picks how a quote inside a value is escaped: doubled or backslash
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
  ['Product', 'Size'],
  ['Monitor', '24" wide'],
  ['Tablet', '10" screen'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type the escape character: a backslash, or any other. Empty means the default.' });
  const f = flow(stage, { from: 'Products', via: 'Papa.unparse(rows, { escapeChar })', to: 'CSV text' });
  let rows: Grid = ROWS;

  const unparse = (escapeChar: string): void => {
    // The quote inside "24" wide" must be marked so a reader knows it is not the end of the value.
    const csv = Papa.unparse(rows, escapeChar ? { escapeChar } : {});
    f.to.show(csvView(csv, { escapeChar: escapeChar || undefined, lineClass: (i) => (i === 1 ? 'pp-hit' : undefined) }));
    if (!escapeChar) stage.say('Default: the inch mark is doubled ("").');
    else stage.say(`escapeChar ${escapeChar} goes before the inch mark.`, 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(ROWS, { numbered: false }));
    stage.cycle(['', '\\'], 2800, (c) => {
      unparse(c);
      revealRows(f.to.body);
    });
  } else {
    let c = '\\';
    textInput(stage.bar!, 'escapeChar', c, (v) => {
      c = v;
      unparse(c);
    }, 3);
    f.from.show(jsonEditor(ROWS, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(c);
      }
    }, 6).el);
    unparse(c);
  }
  return stage.dispose;
};

export default mount;
