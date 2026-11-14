// collection.last(): the last row of a collection, or undefined
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  const last = (label: string, text: string, code: string, make: () => ReturnType<typeof t.toCollection>) =>
    d.step(label, text, code, async () => {
      const row = await make().last();
      if (row) {
        view.mark([row.id]);
        out.value(row.name, `age ${row.age}`);
      } else out.value(undefined, 'nobody found', 'warn');
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    last('Oldest', 'The oldest friend.', "orderBy('age').last()", () => t.orderBy('age')),
    last('Last under 60', 'Oldest of the under-60s.', "where('age').below(60).last()", () => t.where('age').below(60)),
    last('Nobody', 'Nobody is under 2.', "where('age').below(2).last()", () => t.where('age').below(2)),
  ]);
  return d.stage.dispose;
};

export default mount;
