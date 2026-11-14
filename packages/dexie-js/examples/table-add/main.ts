// Table.add(): store a row and get its new id back
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: '++id, name, age', seed: friends(2), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Two friends are stored.', "db.friends.add({ name, age })");
  d.run([
    d.step('Add Sara', 'add() stores a row, returns its id.', "db.friends.add({ name: 'Sara', age: 50 })", async () => {
      out.value(await t.add({ name: 'Sara', age: 50 }), 'id of the new row');
    }),
    d.step('Id lands on the object', 'The id is set on your object too.', 'const item = { name }; await add(item)', async () => {
      const item: { id?: number; name: string; age: number } = { name: 'Ulla Bella', age: 87 };
      await t.add(item);
      out.value(item.id, 'item.id, filled in for you');
    }),
  ]);

  return stage.dispose;
};

export default mount;
