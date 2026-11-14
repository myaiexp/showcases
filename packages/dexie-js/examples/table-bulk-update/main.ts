// Table.bulkUpdate(): apply a list of {key, changes}, counting the keys found
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(5), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Five friends are stored.');
  d.run([
    d.step('Three edits', 'Key 99 is skipped, no error.', 'db.friends.bulkUpdate([{ key, changes }, ...])', async () => {
      const n = await t.bulkUpdate([
        { key: 1, changes: { age: 22 } },
        { key: 3, changes: { name: 'Simon Jr' } },
        { key: 99, changes: { age: 1 } },
      ]);
      out.value(n, 'of 3 keys were found');
    }),
    d.step('Remove a field', 'undefined deletes the field.', 'bulkUpdate([{ key: 4, changes: { age: undefined } }])', async () => {
      out.value(await t.bulkUpdate([{ key: 4, changes: { age: undefined } }]), 'of 1 keys were found');
    }),
  ]);

  return stage.dispose;
};

export default mount;
