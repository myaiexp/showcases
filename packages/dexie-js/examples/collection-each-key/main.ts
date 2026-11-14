// collection.eachKey(): iterate index keys (names, ages), not whole rows
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { walk } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, out } = d;
  const visit = (label: string, text: string, code: string, make: () => ReturnType<typeof t.toCollection>) =>
    d.step(label, text, code, async () => {
      const keys: unknown[] = [];
      const ids: unknown[] = [];
      await make().eachKey((key, cursor) => {
        keys.push(key);
        ids.push(cursor.primaryKey);
      });
      out.list(keys.map(String));
      await walk(d, ids);
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    visit('Names', 'Visit the names, A to Z.', "orderBy('name').eachKey(k => ...)", () => t.orderBy('name')),
    visit('Ages', 'Visit the ages, smallest first.', "orderBy('age').eachKey(k => ...)", () => t.orderBy('age')),
    visit('Ages over 30', 'Only ages above 30.', "where('age').above(30).eachKey(...)", () => t.where('age').above(30)),
  ]);
  return d.stage.dispose;
};

export default mount;
