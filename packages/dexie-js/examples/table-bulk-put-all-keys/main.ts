// Table.bulkPut(items, {allKeys: true}) returns one key per row, in order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends are stored.');
  d.run([
    d.step('Put 3, allKeys', 'You get one key per row, in order.', 'db.friends.bulkPut(rows, { allKeys: true })', async () => {
      const keys: number[] = await t.bulkPut(
        [{ id: 2, name: 'Per', age: 76 }, { id: 8, name: 'Kate', age: 89 }, { id: 3, name: 'Simon', age: 6 }],
        { allKeys: true },
      );
      out.list(keys.map((k, i) => `row ${i + 1} is key ${k}`));
    }),
  ]);

  return stage.dispose;
};

export default mount;
