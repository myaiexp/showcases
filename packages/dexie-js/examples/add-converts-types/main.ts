// add() on values of the wrong type: numeric text converts, anything else counts as zero
import Dexie, { add, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Counter {
  id: string;
  was: string;
  value?: unknown;
}

// `was` is a label of what each row held before; `value` is what add() works on.
const START: Counter[] = [
  { id: 'a', was: 'the number 7', value: 7 },
  { id: 'b', was: "the text '12'", value: '12' },
  { id: 'c', was: "the text 'abc'", value: 'abc' },
  { id: 'd', was: 'null', value: null },
  { id: 'e', was: 'nothing' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const db = stage.own(new Dexie(stage.dbName('counters'))) as Dexie & { counters: EntityTable<Counter, 'id'> };
  db.version(1).stores({ counters: 'id' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.counters,
    columns: [
      { field: 'id', width: '2.4em' },
      { field: 'was', label: 'held' },
      { field: 'value', width: '4.6em', format: (v) => (typeof v === 'string' ? `'${v}'` : typeof v === 'bigint' ? `${v}n` : v == null ? '' : String(v)) },
    ],
  });

  const plusOne = (id: string, text: string) => ({
    label: `add(1) to ${id}`,
    run: async () => {
      view.mark([id]);
      say.set(text, `db.counters.update('${id}', { value: add(1) })`);
      await db.counters.update(id, { value: add(1) });
    },
    hold: 1700,
  });

  tour(
    stage,
    [
      plusOne('a', 'A number: plain addition, 7 + 1.'),
      plusOne('b', "Numeric text '12' turns into 13."),
      plusOne('c', "'abc' is no number: counts as 0."),
      plusOne('d', 'null counts as nothing: becomes 1.'),
      plusOne('e', 'Missing entirely: set to 1.'),
      {
        label: 'add(10n) to a',
        run: async () => {
          view.mark(['a']);
          say.set('A bigint argument makes it a bigint.', "db.counters.update('a', { value: add(10n) })");
          await db.counters.update('a', { value: add(10n) });
        },
      },
    ],
    {
      setup: () => db.counters.bulkPut(START),
      reset: async () => {
        view.unmark();
        say.set('Put the original values back.', 'db.counters.bulkPut([...])');
        await db.counters.bulkPut(START);
        await stage.wait(1200);
      },
    },
  );
  say.set('One add(1), five different starting values.', 'update(id, { value: add(1) })');

  return stage.dispose;
};

export default mount;
