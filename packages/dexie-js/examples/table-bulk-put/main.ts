// Table.bulkPut(): put many rows, new ones added and old ones replaced
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const rows = [{ id: 2, name: 'Per', age: 76 }, { id: 5, name: 'Ulla Bella', age: 87 }, { id: 6, name: 'Elna', age: 99 }];
  say.set('Four friends are stored.');
  d.run([
    d.step('Put 3 rows', 'Old ids are replaced, new ones added.', 'db.friends.bulkPut([...3 rows])', async () => {
      out.value(await t.bulkPut(rows), 'key of the last row');
    }),
    d.step('Put them again', 'The same rows again: nothing changes.', 'db.friends.bulkPut([...3 rows])', async () => {
      out.value(await t.bulkPut(rows), 'same result, no changes');
    }),
  ]);

  return stage.dispose;
};

export default mount;
