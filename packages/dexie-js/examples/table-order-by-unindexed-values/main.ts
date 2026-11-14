// Table.orderBy(): rows with a missing or non-indexable value are left out
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: 'id, name, age',
  seed: [{ id: 1, name: 'Josephine', age: 21 }, { id: 2, name: 'Per' }, { id: 3, name: 'Simon', age: 5 }, { id: 4, name: 'Sara', age: null }],
  columns: FRIEND_COLS,
});
  const { stage, db, t, say, view, out } = d;
  say.set('Two friends have no usable age.');
  d.run([
    d.step('toArray()', 'Everyone, no sorting.', 'db.friends.toArray()', async () => {
      const rows = await t.toArray();
      out.list(rows.map((r: { name: string }) => r.name));
    }),
    d.step("orderBy('age')", 'Rows with no age drop out.', "db.friends.orderBy('age').toArray()", async () => {
      const rows = await t.orderBy('age').toArray();
      view.mark(rows.map((r: { id: number }) => r.id));
      out.list(rows.map((r: { name: string; age: number }) => `${r.name} ${r.age}`));
    }),
  ]);

  return stage.dispose;
};

export default mount;
