// collection.reverse() + sortBy(): descending order by any field
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  const name = (r: Record<string, unknown>) => String(r.name);
  say.set('Over 25, then sorted by name.', "where('age').above(25)");
  d.run([
    d.step('sortBy name', 'A to Z.', ".sortBy('name')", async () => pick(d, await t.where('age').above(25).sortBy('name'), name)),
    d.step('reverse first', 'Z to A.', ".reverse().sortBy('name')", async () =>
      pick(d, await t.where('age').above(25).reverse().sortBy('name'), name),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
