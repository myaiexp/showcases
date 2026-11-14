// collection.and(): index first, then a plain JavaScript test
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick, SHOE_FRIENDS, shoeCols } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age, shoeSize', seed: SHOE_FRIENDS, columns: shoeCols(ctx.preview) });
  const { t, say } = d;
  say.set('Six friends with a shoe size.', "stores: 'id, name, age, shoeSize'");
  d.run([
    d.step('Age above 25', 'The index finds everyone over 25.', "where('age').above(25)", async () =>
      pick(d, await t.where('age').above(25).toArray()),
    ),
    d.step('and() shoe size', 'and() keeps only big feet.', '.and(f => f.shoeSize > 40)', async () =>
      pick(d, await t.where('age').above(25).and((f) => f.shoeSize > 40).toArray()),
    ),
    d.step('and() a letter', 'and() can test anything in JS.', '.and(f => /a/i.test(f.name))', async () =>
      pick(d, await t.where('age').above(25).and((f) => /a/i.test(f.name)).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
