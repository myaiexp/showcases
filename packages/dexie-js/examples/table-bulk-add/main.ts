// Table.bulkAdd(): store an array of rows at once
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('An empty table.');
  d.run([
    d.step('Add 4 friends', 'One call stores all four rows.', 'db.friends.bulkAdd([...4 friends])', async () => {
      out.value(await t.bulkAdd(friends(4)), 'key of the last row');
    }),
    d.step('Add 2 more', 'And two more, in one call.', 'db.friends.bulkAdd([...2 friends])', async () => {
      out.value(await t.bulkAdd(friends(6).slice(4)), 'key of the last row');
    }),
  ]);

  return stage.dispose;
};

export default mount;
