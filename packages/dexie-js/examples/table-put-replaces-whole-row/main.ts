// Table.put() drops fields you leave out, Table.update() keeps them
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: 'id, name',
  seed: [{ id: 1, name: 'Josephine', city: 'Oslo' }, { id: 2, name: 'Per', city: 'Rome' }],
  columns: [ID_COL, 'name', 'city'],
});
  const { stage, db, t, say, view, out } = d;
  say.set('Two friends, each with a city.');
  d.run([
    d.step('put() a new name', 'put() swaps the row: city is lost.', "db.friends.put({ id: 1, name: 'Jo' })", async () => {
      await t.put({ id: 1, name: 'Josephine B' });
      out.value('city gone', 'only what you passed is kept', 'warn');
    }),
    d.step('update() a name', 'update() changes only the name.', "db.friends.update(2, { name: 'Per P' })", async () => {
      await t.update(2, { name: 'Per P' });
      out.value('city kept', 'other fields are untouched');
    }),
  ]);

  return stage.dispose;
};

export default mount;
