// Table.update(key, changes): apply changes to one existing row
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Four friends are stored.');
  d.run([
    d.step('Change one field', 'Only the age changes.', 'db.friends.update(2, { age: 76 })', async () => {
      out.value(await t.update(2, { age: 76 }), 'row found and updated');
    }),
    d.step('Change two fields', 'Name the fields you want to change.', "db.friends.update(3, { name, age })", async () => {
      out.value(await t.update(3, { name: 'Simon Jr', age: 6 }), 'row found and updated');
    }),
  ]);

  return stage.dispose;
};

export default mount;
