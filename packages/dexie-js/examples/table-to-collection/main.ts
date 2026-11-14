// Table.toCollection(): an unfiltered Collection to chain more calls on
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Six friends are stored.');
  d.run([
    d.step('Count', 'Everything, counted.', 'db.friends.toCollection().count()', async () => {
      out.value(await t.toCollection().count(), 'rows');
    }),
    d.step('Over 30', 'Chain a filter onto it.', 'toCollection().filter(f => f.age > 30)', async () => {
      const rows = await t.toCollection().filter((f: { age: number }) => f.age > 30).toArray();
      view.mark(rows.map((r: { id: number }) => r.id));
      out.list(rows.map((r: { name: string }) => r.name));
    }),
    d.step('First', 'Or just take the first row.', 'db.friends.toCollection().first()', async () => {
      const f = await t.toCollection().first();
      view.mark([f.id]);
      out.value(f.name, `row ${f.id}`);
    }),
  ]);

  return stage.dispose;
};

export default mount;
