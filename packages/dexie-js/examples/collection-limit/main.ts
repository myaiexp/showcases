// collection.limit(): keep only the first N rows of a collection
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('limit(3)', 'The 3 youngest friends.', "orderBy('age').limit(3)", async () =>
      pick(d, await t.orderBy('age').limit(3).toArray()),
    ),
    d.step('limit(1)', 'Just the youngest one.', "orderBy('age').limit(1)", async () =>
      pick(d, await t.orderBy('age').limit(1).toArray()),
    ),
    d.step('With where()', 'First 2 over 30.', "where('age').above(30).limit(2)", async () =>
      pick(d, await t.where('age').above(30).limit(2).toArray()),
    ),
    d.step('limit(50)', 'A big limit returns it all.', "orderBy('age').limit(50)", async () =>
      pick(d, await t.orderBy('age').limit(50).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
