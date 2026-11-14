// { fields, data } names the header, so bare rows get column titles
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { attempt, jsonEditor } from '../../shared/unparse-kit.ts';

const ROWS = [
  ['Teapot', 24.9, 12],
  ['Mug', 6, 40],
];
const FIELDS = ['Product', 'Price', 'In stock'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rename or reorder the fields. Give fewer fields than values and see what happens.' });
  const f = flow(stage, {
    from: 'Bare rows',
    via: 'Papa.unparse({ fields, data })',
    to: 'CSV text',
  });
  let fields: string[] = FIELDS;
  let data: unknown[] = ROWS;

  const unparse = (useFields: boolean): void => {
    // Without `fields` the rows are just rows; with it the header line is written first.
    const input = useFields ? { fields, data } : data;
    const { text, error } = attempt(() => Papa.unparse(input as unknown[][]));
    f.to.show(csvView(text, { lineClass: (i) => (useFields && i === 0 ? 'pp-hit' : undefined) }));
    if (error) stage.say(error, 'bad');
    else stage.say(useFields ? 'fields became the header line.' : 'No fields: just values, no names.', useFields ? 'ok' : 'warn');
  };

  if (stage.preview) {
    f.from.show(dataTable(ROWS, { numbered: false }));
    stage.cycle([false, true], 2600, (useFields) => {
      unparse(useFields);
      revealRows(f.to.body);
    });
  } else {
    textInput(stage.bar!, 'fields', FIELDS.join(', '), (v) => {
      fields = v.split(',').map((s) => s.trim());
      unparse(true);
    }, 28);
    const editor = jsonEditor(ROWS, (v) => {
      if (Array.isArray(v)) {
        data = v;
        unparse(true);
      }
    }, 5);
    f.from.show(editor.el);
    unparse(true);
  }
  return stage.dispose;
};

export default mount;
