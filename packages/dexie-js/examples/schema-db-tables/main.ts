// db.tables: the list of every table, each with the schema it was declared with
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { schemaLines } from '../../shared/era.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, name, age',
    extra: { pets: '++id, name, kind', cars: '++, model' },
    seed: friends(3),
    columns: FRIEND_COLS,
  });
  const { stage, db, say, out } = d;
  say.set('One database, three tables.', "stores({ friends: ..., pets: ..., cars: ... })");
  d.run([
    d.step('List the tables', 'db.tables has one Table per store.', 'db.tables.map(t => t.name)', async () => {
      out.list(db.tables.map((t) => t.name));
    }),
    d.step('Each table\'s schema', 'Each Table knows its own indexes.', 'table.schema.primKey + indexes', async () => {
      out.list(schemaLines(db));
    }),
    d.step('Same as db.pets', 'A Table is also a property of db.', 'db.tables.includes(db.pets)', async () => {
      const pets = db.table('pets');
      out.value(db.tables.includes(pets) && pets === (db as unknown as Record<string, unknown>).pets, 'db.pets is one of db.tables');
    }),
  ]);
  return stage.dispose;
};

export default mount;
