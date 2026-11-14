// collection.toArray(): run a query and get every matching row as a list
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const row = (r: Record<string, unknown>) => `${r.id} ${r.name}`;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Whole table', 'Every row, in id order.', 'db.friends.toCollection().toArray()', async () =>
      pick(d, await t.toCollection().toArray(), row),
    ),
    d.step('Names with S', "Names that start with 'S'.", "where('name').startsWith('S').toArray()", async () =>
      pick(d, await t.where('name').startsWith('S').toArray(), row),
    ),
    d.step('Sorted slice', 'Two oldest, oldest first.', "orderBy('age').reverse().limit(2).toArray()", async () =>
      pick(d, await t.orderBy('age').reverse().limit(2).toArray(), row),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
