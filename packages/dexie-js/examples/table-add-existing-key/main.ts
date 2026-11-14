// Table.add() fails with ConstraintError on an existing key, put() replaces
import type { Mount } from '@/types.ts';
import { demo, attempt, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Four friends, ids 1 to 4.');
  d.run([
    d.step('Add id 5', 'add() with a free id works.', "db.friends.add({ id: 5, ... })", async () => {
      out.value(await t.add({ id: 5, name: 'Ulla Bella', age: 87 }), 'stored under id');
    }),
    d.step('Add id 2 again', 'add() refuses an id that is taken.', "db.friends.add({ id: 2, ... })", async () => {
      const r = await attempt(t.add({ id: 2, name: 'Imposter', age: 1 }));
      view.mark([2], 'bad', false);
      out.value(r.error?.name ?? 'added', 'the table is unchanged', 'bad');
    }),
    d.step('Put id 2 instead', 'put() overwrites the old row.', "db.friends.put({ id: 2, ... })", async () => {
      out.value(await t.put({ id: 2, name: 'Imposter', age: 1 }), 'row 2 was replaced');
    }),
  ]);

  return stage.dispose;
};

export default mount;
