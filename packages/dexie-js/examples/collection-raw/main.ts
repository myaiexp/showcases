// collection.raw(): read rows without passing them through a reading hook
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  // Every row read through a collection gets a "label" on its way out.
  t.hook('reading', (friend) => ({ ...friend, label: `Dear ${friend.name}` }));
  const text = (r: Record<string, unknown>) => String(r.label ?? `${r.name} (stored)`);
  say.set('A hook adds a label when reading.', "table.hook('reading', f => ...)");
  d.run([
    d.step('Normal read', 'Hook on: rows have a label.', "orderBy('age').limit(3).toArray()", async () =>
      pick(d, await t.orderBy('age').limit(3).toArray(), text),
    ),
    d.step('raw()', 'raw(): rows as stored.', "orderBy('age').limit(3).raw().toArray()", async () =>
      pick(d, await t.orderBy('age').limit(3).raw().toArray(), text),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
