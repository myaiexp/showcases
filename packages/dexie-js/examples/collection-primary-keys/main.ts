// collection.primaryKeys(): ids of the matching rows, in collection order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  const ids = async (make: () => ReturnType<typeof t.toCollection>) => {
    const keys = await make().primaryKeys();
    view.mark(keys);
    out.list(keys.map((k) => `id ${k}`));
  };
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Over 30', 'Ids of the over-30s.', "where('age').above(30).primaryKeys()", () => ids(() => t.where('age').above(30))),
    d.step('By name', 'Ids in name order.', "orderBy('name').primaryKeys()", () => ids(() => t.orderBy('name'))),
    d.step('Youngest 3', 'Ids of the 3 youngest.', "orderBy('age').limit(3).primaryKeys()", () => ids(() => t.orderBy('age').limit(3))),
  ]);
  return d.stage.dispose;
};

export default mount;
