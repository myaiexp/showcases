// An Excel export starts with an invisible mark: Papa strips it so row.name works
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, pane } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import './style.css';

const BODY = 'name,qty\nAda,3\nBo,5';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick the box: with no mark in the file, both readers agree.' });
  const f = flow(stage, { from: 'File saved by Excel', via: 'two ways to read it', to: 'row.name', dir: 'column', split: 0.34 });
  const naive = pane("text.split(',')", 'pp-naive');
  const papa = pane('Papa.parse(text, { header: true })', 'pp-papa');
  if (!stage.preview) {
    const sides = document.createElement('div');
    sides.className = 'sides';
    sides.append(naive.el, papa.el);
    f.to.show(sides);
  }

  const read = (withMark: boolean, which: 'naive' | 'papa' | 'both'): void => {
    // Excel puts the byte order mark first in the file. Papa.BYTE_ORDER_MARK is that character.
    const text = (withMark ? Papa.BYTE_ORDER_MARK : '') + BODY;
    f.from.show(csvView(text));
    const [head = '', ...rest] = text.split('\n');
    const names = head.split(',');
    const naiveRows = rest.map((line) => Object.fromEntries(line.split(',').map((v, i) => [names[i]!, v])));
    const papaRows = Papa.parse<Record<string, string>>(text, { header: true }).data; // header: true names the columns
    const lookup = (rows: Record<string, string>[]): string => `row.name → ${JSON.stringify(rows[0]?.['name'])}`;
    const mark = (rows: Record<string, string>[]) => (): string | undefined => (rows[0]?.['name'] === undefined ? 'pp-bad' : 'pp-ok');
    const draw = (p: typeof naive, rows: Record<string, string>[]): void => {
      const note = document.createElement('div');
      note.className = rows[0]?.['name'] === undefined ? 'pp-bad' : 'pp-ok';
      note.textContent = lookup(rows);
      p.show(dataTable(rows, { numbered: false, maxRows: 2, rowClass: mark(rows) }), note);
    };
    if (stage.preview) {
      const rows = which === 'naive' ? naiveRows : papaRows;
      f.to.title.textContent = which === 'naive' ? "text.split(',')" : 'Papa.parse(text, { header: true })';
      draw(f.to, rows);
    } else {
      draw(naive, naiveRows);
      draw(papa, papaRows);
    }
    const lost = withMark && naiveRows[0]?.['name'] === undefined;
    stage.say(
      lost ? (which === 'papa' ? 'Papa dropped the mark: row.name works.' : 'The mark hides in "name": row.name is lost.') : 'No mark in the file: both agree.',
      lost && which !== 'papa' ? 'bad' : 'ok',
    );
  };

  if (stage.preview) {
    stage.cycle<'naive' | 'papa'>(['naive', 'papa'], 3000, (w) => read(true, w));
  } else {
    read(true, 'both');
    checkbox(stage.bar!, 'file starts with a byte order mark', true, (on) => read(on, 'both'));
  }
  return stage.dispose;
};

export default mount;
