// A table of orders is unparsed, wrapped in a Blob and saved as a .csv file
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider, textInput } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { orders } from '../../shared/data.ts';
import { flash, flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { fileChip } from '../../shared/widgets.ts';

/** The orders as plain records: the part of the shop's data worth exporting. */
const records = (n: number) => orders(n).map(({ id, customer, item, qty, price }) => ({ id, customer, item, qty, price }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose how many orders, name the file, and press Download: your browser saves a real .csv.' });
  const f = flow(stage, { from: 'Orders table', via: 'Papa.unparse(rows)', to: 'orders.csv' });
  const urls = new Set<string>();
  stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));

  if (stage.preview) {
    const rows = records(3);
    f.from.show(dataTable(rows, { numbered: false }));
    stage.play(async (wait) => {
      f.to.show();
      f.via.textContent = 'Papa.unparse(rows)';
      const csv = Papa.unparse(rows); // 1. rows → text
      f.to.show(csvView(csv));
      stage.say('1. The table is written as CSV text.');
      await wait(2000);
      f.via.textContent = 'new Blob([csv])';
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); // 2. text → file
      f.to.show(fileChip({ name: 'orders.csv', size: blob.size }));
      stage.say(`2. The text becomes a ${blob.size}-byte file.`);
      await wait(1800);
      f.via.textContent = 'link.download = "orders.csv"';
      flash(f.to.body.firstElementChild!, 'var(--green)');
      stage.say('3. A link hands it to the browser.', 'ok');
      await wait(2200);
    });
    return stage.dispose;
  }

  let count = 12;
  let name = 'orders.csv';
  const show = (): string => {
    const rows = records(count);
    const csv = Papa.unparse(rows);
    f.from.show(dataTable(rows, { numbered: false, maxRows: 5 }));
    f.to.show(csvView(csv, { maxLines: 6 }), fileChip({ name, size: new Blob([csv]).size }));
    stage.say(`${rows.length} orders, ${csv.split('\r\n').length} lines of text.`, 'ok');
    return csv;
  };
  slider(stage.bar!, 'orders', 1, 200, 1, count, (v) => {
    count = v;
    show();
  });
  textInput(stage.bar!, 'file name', name, (v) => {
    name = v.trim() || 'orders.csv';
    show();
  }, 14);
  button(stage.bar!, 'Download', () => {
    const csv = show();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); // the file's contents
    const url = URL.createObjectURL(blob);
    urls.add(url);
    const link = document.createElement('a'); // a link that saves instead of navigating
    link.href = url;
    link.download = name;
    link.click();
    stage.say(`Saved ${name} (${blob.size} bytes) through a download link.`, 'ok');
  });
  show();
  return stage.dispose;
};

export default mount;
