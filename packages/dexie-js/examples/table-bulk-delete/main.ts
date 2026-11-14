// Table.bulkDelete(keys): delete the rows with the given keys in one call
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Six friends are stored.');
  d.run([
    d.step('Delete 1, 3, 5', 'Three rows go in one call.', 'db.friends.bulkDelete([1, 3, 5])', async () => {
      await t.bulkDelete([1, 3, 5]);
      out.value('3 deleted');
    }),
    d.step('Delete 2 and 99', 'Key 99 does not exist: ignored.', 'db.friends.bulkDelete([2, 99])', async () => {
      await t.bulkDelete([2, 99]);
      out.value('1 deleted', 'key 99 was not there', 'warn');
    }),
  ]);

  return stage.dispose;
};

export default mount;
