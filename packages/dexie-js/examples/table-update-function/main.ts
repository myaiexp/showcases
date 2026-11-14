// Table.update(key, fn): change the stored row by running a function on it
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Four friends are stored.');
  d.run([
    d.step('Add a year', 'The function sees the old age.', 'db.friends.update(2, f => { f.age++ })', async () => {
      out.value(await t.update(2, (f: { age: number }) => { f.age++; }), 'row found and updated');
    }),
    d.step('Shout the name', 'Any change you can write in code.', 'update(1, f => { f.name = upper })', async () => {
      out.value(await t.update(1, (f: { name: string }) => { f.name = f.name.toUpperCase(); }), 'row found and updated');
    }),
    d.step('Forget the age', 'Delete a field from the row.', 'update(3, f => { delete f.age })', async () => {
      out.value(await t.update(3, (f: { age?: number }) => { delete f.age; }), 'row found and updated');
    }),
  ]);

  return stage.dispose;
};

export default mount;
