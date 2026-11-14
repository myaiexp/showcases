// A middleware that only counts how many requests of each kind pass
import type { Mount } from '@/types.ts';
import { FRIEND_COLS, friends } from '../../shared/demo.ts';
import { plainDemo } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, out } = d;
  const counts = { get: 0, query: 0, mutate: 0 };
  let counting = false;
  const bump = (kind: keyof typeof counts): void => {
    if (counting) counts[kind]++;
  };
  db.use({
    stack: 'dbcore',
    name: 'RequestCounter',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          get: (req) => (bump('get'), table.get(req)),
          query: (req) => (bump('query'), table.query(req)),
          mutate: (req) => (bump('mutate'), table.mutate(req)),
        };
      },
    }),
  });
  d.say.set('The counter starts at zero.', 'get / query / mutate += 1');
  const show = (): void => out.list(Object.entries(counts).map(([kind, n]) => `${kind}: ${n}`));
  const count = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => {
      counting = true;
      try {
        await fn();
      } finally {
        counting = false;
      }
      show();
    }, 2300);
  d.run([
    d.step('Reset the counter', 'Zero requests so far.', 'counts = { get: 0, ... }', () => {
      Object.assign(counts, { get: 0, query: 0, mutate: 0 });
      show();
    }, 1200),
    count('Read 3 rows', 'Three get() calls, three requests.', 'await t.get(1); t.get(2); t.get(3)', async () => {
      for (const id of [1, 2, 3]) await t.get(id);
    }),
    count('List everyone', 'One toArray(), one query.', 't.toArray()', () => t.toArray()),
    count('Save two rows', 'Two put() calls, two mutates.', 't.put(...) twice', async () => {
      await t.put({ id: 1, name: 'Josephine', age: 22 });
      await t.put({ id: 2, name: 'Per', age: 76 });
    }),
  ]);
  return stage.dispose;
};

export default mount;
