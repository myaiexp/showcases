// collection.delete(): where().anyOf().or().delete() clears two kinds of orders
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';

const orders = [
  { id: 1, state: 'finished', date: '2014-03-05' },
  { id: 2, state: 'open', date: '2014-03-10' },
  { id: 3, state: 'discarded', date: '2014-03-12' },
  { id: 4, state: 'open', date: '2014-01-20' },
  { id: 5, state: 'open', date: '2014-04-02' },
  { id: 6, state: 'finished', date: '2014-01-15' },
];

const mount: Mount = (el, ctx) => {
  const columns = ctx.preview ? ['state', 'date'] : [{ field: 'id', width: '2.6em' }, 'state', 'date'];
  const d = demo(el, ctx, { table: 'orders', stores: 'id, state, date', seed: orders, columns });
  const { t, say, view, out } = d;
  const stale = () => t.where('state').anyOf('finished', 'discarded').or('date').below('2014-02-01');
  say.set('Six orders.', "stores: 'id, state, date'");
  d.run([
    d.step('Find them', 'Done, dropped or old orders.', "anyOf('finished','discarded').or('date')", async () =>
      view.mark(await stale().primaryKeys(), 'bad'),
    ),
    d.step('Delete', 'Delete all of them at once.', '.or("date").below("2014-02-01").delete()', async () =>
      out.value(await stale().delete(), 'orders deleted', 'warn'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
