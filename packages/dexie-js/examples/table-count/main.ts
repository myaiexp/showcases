// Table.count(): the number of rows, updated as the table changes
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Six friends are stored.');
  d.run([
    d.step('Count', 'Count the rows.', 'await db.friends.count()', async () => {
      out.value(await t.count(), 'rows');
    }),
    d.step('Add one, count', 'One more row, one more in the count.', 'put({ id: 7, ... }); count()', async () => {
      await t.put({ id: 7, name: 'Arnold', age: 33 });
      out.value(await t.count(), 'rows');
    }),
    d.step('Delete two, count', 'Two fewer rows.', 'bulkDelete([1, 2]); count()', async () => {
      await t.bulkDelete([1, 2]);
      out.value(await t.count(), 'rows');
    }),
  ]);

  return stage.dispose;
};

export default mount;
