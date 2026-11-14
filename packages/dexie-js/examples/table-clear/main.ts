// Table.clear(): delete every row in the table
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(5), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Five friends are stored.');
  d.run([
    d.step('Count', 'Five rows are in the table.', 'db.friends.count()', async () => {
      out.value(await t.count(), 'rows');
    }),
    d.step('Clear', 'Every row is removed at once.', 'db.friends.clear()', async () => {
      await t.clear();
      out.value(await t.count(), 'rows left');
    }),
  ]);

  return stage.dispose;
};

export default mount;
