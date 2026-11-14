// collection.or() vs and(): the union and the overlap of two searches
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age, shoeSize', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  say.set('Over 80, or big shoes?', 'two indexes: age and shoeSize');
  d.run([
    d.step('age > 80', 'First search: over 80.', "where('age').above(80)", async () =>
      pick(d, await t.where('age').above(80).toArray()),
    ),
    d.step('shoe > 40', 'Second search: big shoes.', "where('shoeSize').above(40)", async () =>
      pick(d, await t.where('shoeSize').above(40).toArray()),
    ),
    d.step('and()', 'and(): must be both.', ".where('age').above(80).and(...)", async () =>
      pick(d, await t.where('age').above(80).and((f) => f.shoeSize > 40).toArray()),
    ),
    d.step('or()', 'or(): either one, no repeats.', ".where('age').above(80).or('shoeSize')", async () =>
      pick(d, await t.where('age').above(80).or('shoeSize').above(40).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
