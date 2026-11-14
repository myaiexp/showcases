// collection.keys(): the index values of a collection, without loading rows
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Names', 'Just the names, A to Z.', "orderBy('name').keys()", async () =>
      out.list((await t.orderBy('name').keys()).map(String)),
    ),
    d.step('Ages over 30', 'Just the ages above 30.', "where('age').above(30).keys()", async () => {
      view.mark(await t.where('age').above(30).primaryKeys());
      out.list((await t.where('age').above(30).keys()).map(String));
    }),
    d.step('Oldest first', 'All ages, oldest first.', "orderBy('age').reverse().keys()", async () =>
      out.list((await t.orderBy('age').reverse().keys()).map(String)),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
