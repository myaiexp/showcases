// collection.or(): combine searches on different indexes
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age, shoeSize', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  const name = (r: Record<string, unknown>) => String(r.name);
  say.set('Searches on name, shoe and age.', "stores: 'id, name, age, shoeSize'");
  d.run([
    d.step('One search', "Find 'SARA', any case.", "where('name').equalsIgnoreCase('SARA')", async () =>
      pick(d, await t.where('name').equalsIgnoreCase('SARA').toArray(), name),
    ),
    d.step('or() shoe', 'Or anyone with shoe over 41.', ".or('shoeSize').above(41)", async () =>
      pick(d, await t.where('name').equalsIgnoreCase('SARA').or('shoeSize').above(41).toArray(), name),
    ),
    d.step('or() age', 'Or anyone under 10.', ".or('age').below(10)", async () =>
      pick(d, await t.where('name').equalsIgnoreCase('SARA').or('shoeSize').above(41).or('age').below(10).toArray(), name),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
