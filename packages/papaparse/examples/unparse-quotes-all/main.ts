// quotes: true wraps every value in quote marks, numbers and header included
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

const ORDER: Grid = [
  ['Item', 'Qty', 'Price'],
  ['Mug', 2, 6.5],
  ['Tea', 1, 4],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick "quotes" to wrap everything. Empty values (null, undefined) are the exception.' });
  const f = flow(stage, { from: 'Order rows', via: 'Papa.unparse(rows, { quotes })', to: 'CSV text' });
  let rows: Grid = ORDER;

  const unparse = (quotes: boolean): void => {
    // true forces quote marks around every value; false (the default) only where needed
    const csv = Papa.unparse(rows, { quotes });
    f.to.show(csvView(csv));
    if (quotes) stage.say('quotes: true. Even numbers get quotes.', 'warn');
    else stage.say('quotes: false. Only where needed (none).', 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(rows, { numbered: false }));
    stage.cycle([false, true], 2800, (q) => {
      unparse(q);
      revealRows(f.to.body);
    });
  } else {
    let quotes = true;
    checkbox(stage.bar!, 'quotes: true', quotes, (v) => {
      quotes = v;
      unparse(quotes);
    });
    f.from.show(jsonEditor(ORDER, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(quotes);
      }
    }, 6).el);
    unparse(quotes);
  }
  return stage.dispose;
};

export default mount;
