// collection.reverse(): turn a collection's order around
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const name = (r: Record<string, unknown>) => String(r.name);
  say.set('Friends, sorted by name.', "orderBy('name')");
  d.run([
    d.step('A to Z', 'Alphabetical order.', "orderBy('name').toArray()", async () => pick(d, await t.orderBy('name').toArray(), name)),
    d.step('reverse()', 'reverse(): Z to A.', "orderBy('name').reverse()", async () =>
      pick(d, await t.orderBy('name').reverse().toArray(), name),
    ),
    d.step('Twice', 'Reversing twice: A to Z.', '.reverse().reverse()', async () =>
      pick(d, await t.orderBy('name').reverse().reverse().toArray(), name),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
