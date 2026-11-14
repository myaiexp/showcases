// columns picks and orders the exported keys, even with extra or missing ones
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { attempt, jsonEditor } from '../../shared/unparse-kit.ts';

type Records = Record<string, unknown>[];

// Customer records that do not all have the same keys.
const PEOPLE: Records = [
  { name: 'Ada', email: 'ada@mail.io', phone: '555-0101' },
  { name: 'Bruno', email: 'bruno@mail.io', city: 'Lyon' },
];

const STEPS: { columns?: string[]; say: string }[] = [
  { say: 'No columns: the first record sets the header.' },
  { columns: ['name', 'email'], say: 'columns: name, email. Only those two.' },
  { columns: ['email', 'name'], say: 'columns: email, name. Your own order.' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'List the columns to export, separated by commas. Leave it empty to use the first record.' });
  const f = flow(stage, { from: 'Customer records', via: 'Papa.unparse(records, { columns })', to: 'CSV text' });
  let people = PEOPLE;

  const unparse = (columns: string[] | undefined, say?: string): void => {
    // The keys to write, in this order; every record is read through them.
    const { text, error } = attempt(() => Papa.unparse(people, columns ? { columns } : {}));
    f.to.show(csvView(text, { lineClass: (i) => (i === 0 ? 'pp-hit' : undefined) }));
    if (error) stage.say(error, 'bad');
    else stage.say(say ?? (columns ? `columns: ${columns.join(', ')}` : 'No columns: the first record sets the header.'), 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(people, { numbered: false }));
    stage.cycle(STEPS, 2800, (s) => {
      unparse(s.columns, s.say);
      revealRows(f.to.body);
    });
  } else {
    let columns: string[] | undefined = ['name', 'email'];
    textInput(stage.bar!, 'columns', 'name, email', (v) => {
      const list = v.split(',').map((s) => s.trim()).filter(Boolean);
      columns = list.length ? list : undefined; // an empty array would make Papa throw
      unparse(columns);
    }, 24);
    f.from.show(jsonEditor(PEOPLE, (v) => {
      if (Array.isArray(v) && v.every((r) => typeof r === 'object' && r !== null && !Array.isArray(r))) {
        people = v as Records;
        unparse(columns);
      }
    }, 6).el);
    unparse(columns);
  }
  return stage.dispose;
};

export default mount;
