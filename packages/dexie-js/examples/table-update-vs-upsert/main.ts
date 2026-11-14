// Table.update() resolves 0 on a missing key, Table.upsert() adds the row
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends: ids 1 to 3.');
  d.run([
    d.step('update(9, ...)', 'update() on a missing key: nothing.', "db.friends.update(9, { name: 'Ulla' })", async () => {
      out.value(await t.update(9, { name: 'Ulla' }), 'no row had key 9', 'warn');
    }),
    d.step('upsert(9, ...)', 'upsert() creates the missing row.', "db.friends.upsert(9, { name: 'Ulla' })", async () => {
      out.value(await t.upsert(9, { name: 'Ulla' }), 'true means created');
    }),
  ]);

  return stage.dispose;
};

export default mount;
