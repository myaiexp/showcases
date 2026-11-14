// collection.sortBy(): sort a query's result by any property
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  say.set('Over 25, found by the age index.', "where('age').above(25)");
  d.run([
    d.step('Natural order', 'Index order: youngest first.', "where('age').above(25).toArray()", async () =>
      pick(d, await t.where('age').above(25).toArray()),
    ),
    d.step('sortBy name', 'Now sorted by name.', ".sortBy('name')", async () =>
      pick(d, await t.where('age').above(25).sortBy('name'), (r) => String(r.name)),
    ),
    d.step('sortBy shoe', 'Sorted by shoe size (no index).', ".sortBy('shoeSize')", async () =>
      pick(d, await t.where('age').above(25).sortBy('shoeSize'), (r) => `${r.name} ${r.shoeSize}`),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
