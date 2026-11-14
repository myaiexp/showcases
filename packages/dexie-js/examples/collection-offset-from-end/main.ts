// collection.reverse() + offset(): count from the end of a collection
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const name = (r: Record<string, unknown>) => String(r.name);
  say.set('Friends sorted by name, A to Z.', "orderBy('name')");
  d.run([
    d.step('Last 3', 'The last three names.', "orderBy('name').reverse().limit(3)", async () =>
      pick(d, await t.orderBy('name').reverse().limit(3).toArray(), name),
    ),
    d.step('Skip the last', 'Last three, minus the very last.', "orderBy('name').reverse().offset(1).limit(3)", async () =>
      pick(d, await t.orderBy('name').reverse().offset(1).limit(3).toArray(), name),
    ),
    d.step('Drop last 2', 'Everything but the last two.', "orderBy('name').reverse().offset(2)", async () =>
      pick(d, await t.orderBy('name').reverse().offset(2).toArray(), name),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
