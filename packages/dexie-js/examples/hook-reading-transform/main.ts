// hook('reading') changes rows on their way out; the stored row stays as it was
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { plainConnection } from '../../shared/hook-kit.ts';

const rows = [
  { id: 1, name: 'Sara', email: 'sara@home.org' },
  { id: 2, name: 'Per', email: 'per@work.com' },
];

const mount: Mount = (el, ctx) => {
  const columns = ['name', 'email'];
  const d = demo(el, ctx, { stores: 'id, name', seed: rows, columns });
  const { stage, db, t, out } = d;
  // Return a new object: the same one may be handed to other readers.
  t.hook('reading', (row) => ({ ...row, email: String(row.email).replace(/^(.).*(@.*)$/, '$1***$2') }));
  // Hooks belong to one Dexie instance: a second connection sees the stored rows untouched.
  const plain = plainConnection(stage, db, { friends: 'id, name' }).table('friends');
  d.say.set('Emails are hidden on the way out.', "table.hook('reading', row => ({ ...row, email: hide(row.email) }))");
  d.run([
    d.step('Add a friend', 'The grid reads through the hook too.', "t.add({ id: 3, name: 'Elna', ... })", async () => {
      await t.add({ id: 3, name: 'Elna', email: 'elna@club.net' });
      out.idle('grid shows hooked values');
    }),
    d.step('What the app reads', 'get() goes through the hook.', 't.get(1)', async () => {
      out.value((await t.get(1)).email, 'returned by get()');
    }),
    d.step('What is stored', 'A hook-free connection sees the truth.', 'plain.get(1)', async () => {
      out.value((await plain.get(1)).email, 'stored in the database', 'warn');
    }),
  ]);
  return stage.dispose;
};

export default mount;
