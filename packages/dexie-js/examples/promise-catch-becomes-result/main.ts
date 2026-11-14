// What a catch() callback returns becomes the result, so a failed add can fall back to a get
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, t, out } = d;
  d.say.set('Add a friend, or use the one there.');
  d.run([
    d.step('New id', 'Free id: the add succeeds.', 'add({ id: 7, ... })', async () => {
      const key = await t.add({ id: 7, name: 'Gus', age: 61 }).catch(Dexie.ConstraintError, () => t.get(7));
      out.value(key, 'resolved with the new key');
    }),
    d.step('Taken id', 'Taken id: catch returns the old row.', 'add().catch(C, () => get(2))', async () => {
      const row = await t.add({ id: 2, name: 'Twin', age: 1 }).catch(Dexie.ConstraintError, () => t.get(2));
      d.view.mark([2]);
      out.value(row, 'the catch result', 'warn');
    }),
  ]);
  return stage.dispose;
};

export default mount;
