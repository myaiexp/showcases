// Table.add(item, key) on a table whose primary key is not part of the row
import type { Mount } from '@/types.ts';
import { demo, friends } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: ', name', label: 'outbound', withKeys: true,
  seed: [{ key: 'jo-1', name: 'Josephine' }],
  columns: [{ field: 'key', width: '5.5em' }, 'name'],
});
  const { stage, db, t, say, view, out } = d;
  say.set('Primary key is outside the row.', "stores({ friends: ', name' })");
  d.run([
    d.step('Add with key', 'The second argument is the key.', "db.friends.add({ name: 'Per' }, 'per-2')", async () => {
      out.value(await t.add({ name: 'Per' }, 'per-2'), 'the key you gave');
    }),
    d.step('Add another', 'Same key twice would be refused.', "db.friends.add({ name: 'Sara' }, 'sara-3')", async () => {
      out.value(await t.add({ name: 'Sara' }, 'sara-3'), 'the key you gave');
    }),
  ]);

  return stage.dispose;
};

export default mount;
