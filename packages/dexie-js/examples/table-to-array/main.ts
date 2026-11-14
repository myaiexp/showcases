// Table.toArray(): all rows as one array, in primary key order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(5), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const show = async (): Promise<void> => {
    const rows = await t.toArray();
    view.mark(rows.map((r: { id: number }) => r.id));
    out.list(rows.map((r: { name: string; age: number }) => `${r.name}, ${r.age}`));
  };
  say.set('Five friends are stored.');
  d.run([
    d.step('Read all', 'All rows, ordered by id.', 'await db.friends.toArray()', show),
    d.step('Add, read again', 'Read after a change: the new row too.', 'put({ id: 6, ... }); toArray()', async () => {
      await t.put({ id: 6, name: 'Elna', age: 99 });
      await show();
    }),
  ]);

  return stage.dispose;
};

export default mount;
