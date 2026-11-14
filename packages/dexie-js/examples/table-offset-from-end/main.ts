// Table.offset() after reverse(): skip rows from the end
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  const show = (rows: { id: number; name: string; age: number }[], tail = false): void => {
    view.mark(rows.map((r) => r.id));
    out.list(rows.map((r) => (tail ? `${r.name} ${r.age}` : r.name)));
  };
  say.set('Six friends are stored.');
  d.run([
    d.step('Skip the last 2', 'Reverse, then skip two: ids 4 to 1.', 'db.friends.reverse().offset(2).toArray()', async () =>
      show(await t.reverse().offset(2).toArray()),
    ),
    d.step('2nd and 3rd oldest', 'Oldest first, skip one, take two.', "orderBy('age').reverse().offset(1).limit(2)", async () =>
      show(await t.orderBy('age').reverse().offset(1).limit(2).toArray(), true),
    ),
  ]);

  return stage.dispose;
};

export default mount;
