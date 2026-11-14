// Table.upsert(key, changes): resolves true when created, false when updated
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends: ids 1 to 3.');
  d.run([
    d.step('Existing id', 'Row 2 exists: it is updated.', 'db.friends.upsert(2, { age: 76 })', async () => {
      out.value(await t.upsert(2, { age: 76 }), 'false: updated', 'ok');
    }),
    d.step('New id', 'Row 8 is missing: it is created.', "db.friends.upsert(8, { name: 'Elna', age: 99 })", async () => {
      out.value(await t.upsert(8, { name: 'Elna', age: 99 }), 'true: created', 'ok');
    }),
  ]);

  return stage.dispose;
};

export default mount;
