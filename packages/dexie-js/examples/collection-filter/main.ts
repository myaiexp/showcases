// collection.filter(): a JavaScript test over an ordered collection
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  say.set('Six friends, stored by id.', "stores: 'id, name, age'");
  d.run([
    d.step('By age', 'Everyone, youngest first.', "orderBy('age')", async () => pick(d, await t.orderBy('age').toArray())),
    d.step('filter()', "Keep names with an 'a'.", '.filter(f => /a/i.test(f.name))', async () =>
      pick(d, await t.orderBy('age').filter((f) => /a/i.test(f.name)).toArray()),
    ),
    d.step('filter + limit', 'Then take only the first two.', '.filter(...).limit(2)', async () =>
      pick(d, await t.orderBy('age').filter((f) => /a/i.test(f.name)).limit(2).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
