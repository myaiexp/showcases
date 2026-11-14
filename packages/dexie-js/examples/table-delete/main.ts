// Table.delete(key): delete one row, also fine when the key is missing
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Four friends are stored.');
  d.run([
    d.step('Delete id 2', 'The row is removed.', 'db.friends.delete(2)', async () => {
      await t.delete(2);
      out.value('done', 'resolves with undefined');
    }),
    d.step('Delete id 99', 'A missing key: still no error.', 'db.friends.delete(99)', async () => {
      await t.delete(99);
      out.value('done', 'nothing to delete, nothing breaks');
    }),
  ]);

  return stage.dispose;
};

export default mount;
