// collection.or() + sortBy(): give an or() result a fixed order
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age, shoeSize', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  const mixed = () => t.where('age').above(80).or('shoeSize').below(38);
  say.set('Over 80, or shoe under 38.', "where('age').above(80).or('shoeSize')");
  d.run([
    d.step('or() alone', 'or(): the order is undefined.', ".or('shoeSize').below(38).toArray()", async () =>
      pick(d, await mixed().toArray()),
    ),
    d.step('sortBy age', 'sortBy(): youngest first.', ".sortBy('age')", async () => pick(d, await mixed().sortBy('age'))),
    d.step('reverse first', 'reverse().sortBy(): oldest first.', ".reverse().sortBy('age')", async () =>
      pick(d, await mixed().reverse().sortBy('age')),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
