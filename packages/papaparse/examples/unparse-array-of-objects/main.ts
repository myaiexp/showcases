// Contact records become CSV: the first record's keys become the header line
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Records = Record<string, unknown>[];

const BOOKS: Records[] = [
  [
    { name: 'Ada Lovelace', city: 'Leeds', age: 36 },
    { name: 'Bruno Costa', city: 'Lyon', age: 41 },
  ],
  [
    { product: 'Teapot', price: 24.9, stock: 12 },
    { product: 'Mug', price: 6, stock: 40 },
  ],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add a key to the second record only: it is not in the header, so Papa leaves it out.' });
  const f = flow(stage, {
    from: 'Records in the app',
    via: stage.preview ? 'Papa.unparse' : 'Papa.unparse(records)',
    to: 'CSV text',
  });

  const unparse = (records: Records): void => {
    // An array of objects: the keys of the first object become the header line.
    const csv = Papa.unparse(records);
    f.to.show(csvView(csv, { lineClass: (i) => (i === 0 ? 'pp-hit' : undefined) }));
    const header = Object.keys(records[0] ?? {});
    const stray = records.flatMap((r) => Object.keys(r)).find((k) => !header.includes(k));
    if (stray) stage.say(`"${stray}" is not a key of the first record, so it is left out.`, 'warn');
    else stage.say(stage.preview ? "Header line = the first record's keys." : `The header line (highlighted) is the first record's keys: ${header.join(', ')}.`, 'ok');
  };

  if (stage.preview) {
    stage.cycle(BOOKS, 3200, (records) => {
      f.from.show(dataTable(records, { numbered: false }));
      unparse(records);
      revealRows(f.from.body);
    });
  } else {
    const editor = jsonEditor(BOOKS[0], (v) => {
      if (Array.isArray(v) && v.every((r) => typeof r === 'object' && r !== null && !Array.isArray(r))) unparse(v as Records);
    });
    f.from.show(editor.el);
    unparse(BOOKS[0]!);
  }
  return stage.dispose;
};

export default mount;
