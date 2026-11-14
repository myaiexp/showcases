// Table.where({field: value, ...}): a Collection of rows matching all criteria
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: 'id, name, age',
  seed: [{ id: 1, name: 'Josephine', age: 21 }, { id: 2, name: 'David', age: 23 }, { id: 3, name: 'David', age: 43 }, { id: 4, name: 'Sara', age: 50 }],
  columns: FRIEND_COLS,
});
  const { stage, db, t, say, view, out } = d;
  say.set('Two Davids, different ages.');
  d.run([
    d.step('Name only', 'One field: both Davids match.', "db.friends.where({ name: 'David' }).toArray()", async () => {
      const rows = await t.where({ name: 'David' }).toArray();
      view.mark(rows.map((r: { id: number }) => r.id));
      out.list(rows.map((r: { name: string; age: number }) => `${r.name} ${r.age}`));
    }),
    d.step('Name and age', 'Two fields: only one row matches.', "where({ name: 'David', age: 43 }).first()", async () => {
      const f = await t.where({ name: 'David', age: 43 }).first();
      view.mark([f.id]);
      out.value(`${f.name} ${f.age}`, `row ${f.id}`);
    }),
    d.step('Same with get()', 'get() with criteria does the same.', "db.friends.get({ name: 'David', age: 43 })", async () => {
      const f = await t.get({ name: 'David', age: 43 });
      view.mark([f.id]);
      out.value(`${f.name} ${f.age}`, `row ${f.id}`);
    }),
  ]);

  return stage.dispose;
};

export default mount;
