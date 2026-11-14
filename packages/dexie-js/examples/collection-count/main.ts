// collection.count(): the size of a collection, shown big
import type { Collection } from 'dexie';
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  const counted = (label: string, text: string, code: string, make: () => Collection) =>
    d.step(label, text, code, async () => {
      const collection = make();
      view.mark(await collection.primaryKeys());
      out.value(await collection.count(), 'rows');
    });
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    counted('Everyone', 'Count the whole table.', 'db.friends.count()', () => t.toCollection()),
    counted('Above 30', 'Count the over-30s.', "where('age').above(30).count()", () => t.where('age').above(30)),
    counted('Plus and()', "Over 30, name has an 'a'.", '.above(30).and(...).count()', () =>
      t.where('age').above(30).and((f) => /a/i.test(f.name)),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
