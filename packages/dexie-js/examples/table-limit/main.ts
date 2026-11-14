// Table.limit(n): a Collection capped at n rows, in primary key order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { button, numberField } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const first = async (n: number): Promise<void> => {
    view.unmark();
    say.set(`Only the first ${n} rows.`, `db.friends.limit(${n}).toArray()`);
    const rows = await t.limit(n).toArray();
    view.mark(rows.map((r: { id: number }) => r.id));
    out.list(rows.map((r: { name: string }) => r.name));
  };
  say.set('Six friends are stored.');
  d.run([
    { label: 'limit(3)', run: () => first(3) },
    { label: 'limit(5)', run: () => first(5) },
  ]);
  if (!stage.preview) {
    const n = numberField(stage, 'N', 2, 0, 6);
    button(stage, 'limit(N)', () => first(Number(n.value)));
  }

  return stage.dispose;
};

export default mount;
