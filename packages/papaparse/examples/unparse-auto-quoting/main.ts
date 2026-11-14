// Values with a comma, quote, line break or edge space get quoted automatically
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { eventLog } from '../../shared/widgets.ts';
import { jsonEditor, lineRows, whyQuoted } from '../../shared/unparse-kit.ts';

type Grid = unknown[][];

// A shop's stock notes: one value per scene that Papa has to protect, and one that is fine.
const SCENES: Grid[] = [
  [['Item', 'Note'], ['Mug', 'blue, large'], ['Tea', 'loose leaf']],
  [['Item', 'Note'], ['Mug', 'says "Hi"'], ['Tea', 'loose leaf']],
  [['Item', 'Note'], ['Mug', 'chipped\nhandle'], ['Tea', 'loose leaf']],
  [['Item', 'Note'], ['Mug', ' gift '], ['Tea', 'loose leaf']],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type values with commas, quotes (\\") or "\\n" line breaks into the JSON. Only the ones that need it get quoted.' });
  const f = flow(stage, { from: 'Values', via: 'Papa.unparse(rows)', to: 'CSV text' });
  const reasons = stage.preview ? null : eventLog(stage.root, 12);

  const unparse = (rows: Grid): void => {
    const csv = Papa.unparse(rows); // no `quotes` option: Papa quotes only what would break the file
    const owner = lineRows(rows);
    const needs = rows.map((row, r) => r > 0 && row.some((v) => whyQuoted(v)));
    f.to.show(csvView(csv, { lineClass: (i) => (needs[owner[i] ?? 0] ? 'pp-hit' : undefined) }));
    reasons?.clear();
    rows.forEach((row, r) =>
      row.forEach((v, c) => {
        const why = whyQuoted(v);
        if (r > 0 && why) reasons?.add(`Row ${r}, column ${c + 1} is quoted: ${why}.`, 'warn');
      }),
    );
    if (reasons && !needs.some(Boolean)) reasons.add('Nothing here needs quotes, so none are added.', 'ok');
  };

  if (stage.preview) {
    stage.cycle(SCENES, 3000, (rows) => {
      f.from.show(dataTable(rows, { numbered: false }));
      unparse(rows);
      const why = whyQuoted(rows[1]![1]);
      stage.say(`Quoted: ${why}.`, 'ok');
      revealRows(f.from.body);
    });
  } else {
    f.from.show(jsonEditor(SCENES[0], (v) => {
      if (Array.isArray(v) && v.every(Array.isArray)) unparse(v as Grid);
    }, 7).el);
    unparse(SCENES[0]!);
    stage.say('Highlighted lines contain a value Papa quoted by itself: no option needed.');
  }
  return stage.dispose;
};

export default mount;
