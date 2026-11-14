// Table.orderBy(index): all rows sorted by the primary key or an index
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const sort = (index: string) =>
    d.step(`orderBy('${index}')`, `Sorted by ${index === ':id' ? 'primary key' : index}.`, `db.friends.orderBy('${index}').toArray()`, async () => {
      const rows = await t.orderBy(index).toArray();
      out.list(rows.map((r: { name: string; age: number }) => `${r.name} ${r.age}`));
    });
  say.set('Six friends, stored in id order.');
  d.run([sort('age'), sort('name'), sort(':id')]);

  return stage.dispose;
};

export default mount;
