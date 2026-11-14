// newline picks the line ending (CRLF or LF), shown as glyphs with file sizes
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvView, visible } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { stats } from '../../shared/widgets.ts';
import { byteLength, jsonEditor } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

const ROWS: Grid = [
  ['Item', 'Qty'],
  ['Tea', 2],
  ['Mug', 1],
];

const ENDINGS = [
  ['\r\n', '\\r\\n  (Windows, the default)'],
  ['\n', '\\n  (Unix, Mac)'],
  ['\r', '\\r  (old Mac)'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The ␍ and ↵ marks are the line endings. Add rows and watch the size gap grow.' });
  const f = flow(stage, { from: 'Rows', via: 'Papa.unparse(rows, { newline })', to: 'CSV text' });
  let rows: Grid = ROWS;

  const unparse = (newline: string): void => {
    const csv = Papa.unparse(rows, { newline }); // the string written between lines
    const crlf = byteLength(Papa.unparse(rows, { newline: '\r\n' })); // the default, to compare
    const size = byteLength(csv);
    f.to.show(csvView(csv));
    const pills = stats(f.to.body);
    pills.set('bytes', size);
    if (size < crlf) pills.set('saved vs ␍↵', crlf - size, 'ok');
    else pills.set('lines', rows.length);
    stage.say(size < crlf ? `${visible(newline)} saves ${crlf - size} bytes over ␍↵.` : 'Default ␍↵: two characters per line end.', 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(ROWS, { numbered: false }));
    stage.cycle(ENDINGS, 2800, ([n]) => {
      unparse(n);
      revealRows(f.to.body);
    });
  } else {
    let current: string = ENDINGS[0][0];
    select(stage.bar!, 'newline', ENDINGS.map(([n, label]) => [n, label] as const), (n) => {
      current = n;
      unparse(n);
    });
    f.from.show(jsonEditor(ROWS, (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) {
        rows = v as Grid;
        unparse(current);
      }
    }, 6).el);
    unparse(current);
  }
  return stage.dispose;
};

export default mount;
