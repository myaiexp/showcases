// quotes as an array of booleans quotes only the columns switched on
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A class list: the ID column is the one a spreadsheet would turn into a number.
const ROWS: unknown[][] = [
  ['ID', 'Name', 'Group'],
  ['00417', 'Ada', 'B2'],
  ['00923', 'Chen', 'A1'],
];
const NAMES = ['ID', 'Name', 'Group'];
const STEPS: boolean[][] = [
  [true, false, false],
  [false, true, false],
  [false, false, true],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch a column on or off: only its values get quote marks.' });
  const f = flow(stage, { from: 'Class list', via: stage.preview ? 'Papa.unparse(rows, { quotes })' : 'Papa.unparse(rows, { quotes: [...] })', to: 'CSV text' });
  f.from.show(dataTable(ROWS, { numbered: false }));

  const unparse = (quotes: boolean[]): void => {
    // The first boolean is for the first column, the second for the second, and so on.
    const csv = Papa.unparse(ROWS, { quotes });
    f.to.show(csvView(csv));
    const on = NAMES.filter((_, i) => quotes[i]);
    stage.say(`quotes: [${quotes.join(', ')}] quotes ${on.length ? on.join(' + ') : 'nothing'}.`, 'ok');
  };

  if (stage.preview) {
    stage.cycle(STEPS, 2600, unparse);
  } else {
    const quotes = [true, false, false];
    NAMES.forEach((name, i) =>
      checkbox(stage.bar!, `quote ${name}`, quotes[i]!, (v) => {
        quotes[i] = v;
        unparse(quotes);
      }),
    );
    unparse(quotes);
  }
  return stage.dispose;
};

export default mount;
