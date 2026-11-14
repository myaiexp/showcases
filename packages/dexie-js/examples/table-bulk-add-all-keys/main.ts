// Table.bulkAdd(items, {allKeys: true}) returns all resulting keys
import type { Mount } from '@/types.ts';
import { demo, bare, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: '++id, name, age', columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('The table numbers its own rows.', 'stores({ friends: "++id, name, age" })');
  d.run([
    d.step('Add 3, default', 'By default: only the last key.', 'db.friends.bulkAdd(three)', async () => {
      out.value(await t.bulkAdd(bare(friends(3))), 'key of the last row');
    }),
    d.step('Add 3, allKeys', 'With allKeys: one key per row.', 'db.friends.bulkAdd(three, { allKeys: true })', async () => {
      const keys: number[] = await t.bulkAdd(bare(friends(6).slice(3)), { allKeys: true });
      out.list(keys.map((k) => `key ${k}`));
    }),
  ]);

  return stage.dispose;
};

export default mount;
