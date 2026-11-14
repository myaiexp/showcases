// db.use() middleware sees every request: get, query, count and mutate
import type { Mount } from '@/types.ts';
import { FRIEND_COLS, friends } from '../../shared/demo.ts';
import { plainDemo } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log } = d;
  let watching = false; // seeding and cleaning also pass through, and are not the story
  const note = (text: string, tone?: 'warn'): void => {
    if (watching) log.add(text, tone);
  };
  db.use({
    stack: 'dbcore',
    name: 'RequestLogger',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) => {
            note(`mutate: ${req.type}`, 'warn');
            return table.mutate(req);
          },
          get: (req) => {
            note('get: one row by key');
            return table.get(req);
          },
          query: (req) => {
            note('query: a list of rows');
            return table.query(req);
          },
          count: (req) => {
            note('count: just a number');
            return table.count(req);
          },
        };
      },
    }),
  });
  d.say.set('A spy sits between Dexie and the database.', "db.use({ stack: 'dbcore', create })");
  const watch = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => {
      log.clear();
      watching = true;
      try {
        await fn();
      } finally {
        watching = false;
      }
    }, 2100);
  d.run([
    watch('add()', 'Adding is a mutate request.', "t.add({ id: 4, name: 'Elna', age: 99 })", () => t.add({ id: 4, name: 'Elna', age: 99 })),
    watch('get()', 'Fetching one row is a get.', 't.get(1)', () => t.get(1)),
    watch('toArray()', 'Listing rows is a query.', 't.toArray()', () => t.toArray()),
    watch('count()', 'Counting is its own request.', 't.count()', () => t.count()),
    watch('delete()', 'Deleting is a mutate again.', 't.delete(4)', () => t.delete(4)),
  ]);
  return stage.dispose;
};

export default mount;
