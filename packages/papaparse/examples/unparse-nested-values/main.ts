// An array or object in a cell loses its shape; JSON.stringify keeps it
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Records = Record<string, unknown>[];

// A product with a list of colours and a size object inside it.
const SHIRTS: Records = [{ item: 'Shirt', colours: ['red', 'blue'], size: { w: 4 } }];

/** Turns every array or object value into JSON text (Dates are left for Papa). */
const flatten = (records: Records): Records =>
  records.map((r) =>
    Object.fromEntries(
      Object.entries(r).map(([k, v]) => [k, typeof v === 'object' && v !== null && !(v instanceof Date) ? JSON.stringify(v) : v]),
    ),
  );

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box to flatten arrays and objects to JSON text first. Edit the records to try your own.' });
  const f = flow(stage, { from: 'Product records', via: 'Papa.unparse(records)', to: 'CSV text' });
  let records: Records = SHIRTS;

  const unparse = (flat: boolean): void => {
    // Papa writes a nested value with toString(): an array joins its items, an object is "[object Object]".
    const csv = Papa.unparse(flat ? flatten(records) : records);
    f.to.show(csvView(csv, { lineClass: (i) => (i === 1 ? (flat ? 'pp-ok' : 'pp-bad') : undefined) }));
    f.via.textContent = flat ? 'Papa.unparse(flatten(records))' : 'Papa.unparse(records)';
    if (flat) stage.say('Flattened with JSON.stringify: nothing lost.', 'ok');
    else stage.say('Raw: the colours merge, the size is lost.', 'bad');
  };

  if (stage.preview) {
    f.from.show(dataTable(records, { numbered: false }));
    stage.cycle([false, true], 3000, (flat) => {
      unparse(flat);
      revealRows(f.to.body);
    });
  } else {
    let flat = true;
    checkbox(stage.bar!, 'flatten with JSON.stringify first', flat, (v) => {
      flat = v;
      unparse(flat);
    });
    f.from.show(jsonEditor(SHIRTS, (v) => {
      if (Array.isArray(v) && v.every((r) => typeof r === 'object' && r !== null && !Array.isArray(r))) {
        records = v as Records;
        unparse(flat);
      }
    }, 5).el);
    unparse(flat);
  }
  return stage.dispose;
};

export default mount;
