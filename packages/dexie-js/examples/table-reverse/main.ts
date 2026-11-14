// Table.reverse(): all rows in reverse primary key order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(5), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Five friends are stored.');
  d.run([
    d.step('reverse()', 'Highest id first.', 'db.friends.reverse().toArray()', async () => {
      const rows = await t.reverse().toArray();
      out.list(rows.map((r: { id: number; name: string }) => `${r.id} ${r.name}`));
    }),
    d.step('reverse().limit(2)', 'The two newest rows.', 'db.friends.reverse().limit(2).toArray()', async () => {
      const rows = await t.reverse().limit(2).toArray();
      view.mark(rows.map((r: { id: number }) => r.id));
      out.list(rows.map((r: { id: number; name: string }) => `${r.id} ${r.name}`));
    }),
  ]);

  return stage.dispose;
};

export default mount;
