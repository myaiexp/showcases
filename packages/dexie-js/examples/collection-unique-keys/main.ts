// collection.uniqueKeys(): the distinct values of an index
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { firstOfEach, PEOPLE_ROWS, peopleCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { table: 'people', stores: 'id, firstName, lastName, age', seed: PEOPLE_ROWS, columns: peopleCols(ctx.preview) });
  const { t, say, view, out } = d;
  say.set('Six people, repeated names.', "stores: 'id, firstName, lastName'");
  d.run([
    d.step('keys()', 'keys(): one per row, repeats too.', "orderBy('firstName').keys()", async () => {
      out.list((await t.orderBy('firstName').keys()).map(String));
    }),
    d.step('uniqueKeys()', 'uniqueKeys(): no repeats.', "orderBy('firstName').uniqueKeys()", async () => {
      out.list((await t.orderBy('firstName').uniqueKeys()).map(String));
      view.mark(firstOfEach(await t.orderBy('firstName').toArray(), 'firstName').map((r) => r.id));
    }),
    d.step('Last names', 'Last names: Merkel twice.', "orderBy('lastName').uniqueKeys()", async () => {
      out.list((await t.orderBy('lastName').uniqueKeys()).map(String));
      view.mark(firstOfEach(await t.orderBy('lastName').toArray(), 'lastName').map((r) => r.id));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
