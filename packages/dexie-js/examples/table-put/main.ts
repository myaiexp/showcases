// Table.put(): insert a new row or replace the one with that key
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends are stored.');
  d.run([
    d.step('Put a new id', 'A free id: put() adds the row.', "db.friends.put({ id: 7, ... })", async () => {
      out.value(await t.put({ id: 7, name: 'Arnold', age: 33 }), 'key it was stored under');
    }),
    d.step('Put an old id', 'A taken id: put() replaces the row.', "db.friends.put({ id: 2, age: 76, ... })", async () => {
      out.value(await t.put({ id: 2, name: 'Per', age: 76 }), 'key it was stored under');
    }),
  ]);

  return stage.dispose;
};

export default mount;
