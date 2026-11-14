// A CSV text is parsed into a table, edited, and unparsed back into CSV text
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvEditor, csvView } from '../../shared/csv-view.ts';
import { flash, flow, pane, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { editableGrid } from '../../shared/unparse-kit.ts';
import './style.css';

const SHOP = 'item,price,qty\nTea,4.50,2\nHoney,6.20,1\nMug,8.00,3';

type Row = Record<string, string>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the CSV or any cell of the table: the last box is always the text again.' });
  const parse = (text: string) => Papa.parse<Row>(text, { header: true, skipEmptyLines: true }); // text → rows

  if (stage.preview) {
    const f = flow(stage, { from: 'CSV text', via: 'Papa.parse', to: 'Table' });
    stage.play(async (wait) => {
      // 1. Parse the text into a table.
      const parsed = parse(SHOP);
      f.via.classList.remove('up');
      f.via.textContent = 'Papa.parse';
      f.from.show(csvView(SHOP.split('\n').slice(0, 3).join('\n')));
      f.to.show(dataTable(parsed.data.slice(0, 2), { fields: parsed.meta.fields, numbered: false }));
      revealRows(f.to.body);
      stage.say('1. Parse: the text becomes a table.');
      await wait(2200);
      // 2. Edit one cell of the table.
      const rows = parsed.data.slice(0, 2).map((r) => ({ ...r }));
      rows[0]!.price = '5.20';
      f.to.show(dataTable(rows, { fields: parsed.meta.fields, numbered: false, cellClass: (_v, i, c) => (i === 0 && c === 'price' ? 'pp-hit' : undefined) }));
      flash(f.to.body.querySelector('td.pp-hit')!);
      stage.say('2. Edit: Tea now costs 5.20.');
      await wait(2000);
      // 3. Unparse the edited rows into text again.
      f.via.classList.add('up');
      f.via.textContent = 'Papa.unparse';
      f.from.show(csvView(Papa.unparse(rows), { lineClass: (i) => (i === 1 ? 'pp-hit' : undefined) }));
      stage.say('3. Unparse: the text carries the new price.', 'ok');
      await wait(2600);
    });
    return stage.dispose;
  }

  const f = flow(stage, { from: 'CSV text (edit me)', via: 'Papa.parse(text, { header: true })', to: 'Table (edit a cell)' });
  const back = document.createElement('div');
  back.className = 'pp-via';
  back.textContent = '▼ Papa.unparse(rows)';
  const out = pane('CSV text again');
  stage.root.append(back, out.el);

  let fields: string[] = [];
  const unparse = (grid: string[][]): void => {
    const rows = grid.map((cells) => Object.fromEntries(fields.map((k, i) => [k, cells[i] ?? ''])));
    const csv = Papa.unparse(rows); // rows → text; the header comes from the first row's keys
    out.show(csvView(csv, { maxLines: 12 }));
    stage.say(`${rows.length} rows written back as text (lines now end in ␍↵: unparse's own newline).`, 'ok');
  };
  const load = (text: string): void => {
    const parsed = parse(text);
    fields = parsed.meta.fields ?? [];
    const grid = parsed.data.map((r) => fields.map((k) => r[k] ?? ''));
    f.to.show(editableGrid(fields, grid, unparse));
    unparse(grid);
  };
  f.from.show(csvEditor(SHOP, load).el);
  load(SHOP);
  return stage.dispose;
};

export default mount;
