// collection.clone(): change a copy of a query, not the original
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const old = () => t.where('age').above(30);
  say.set('One query: friends above 30.', "const collection = where('age').above(30)");
  d.run([
    d.step('Original', 'The original query, run.', 'collection.toArray()', async () => pick(d, await old().toArray())),
    d.step('A clone', 'A clone, reversed, one item.', 'collection.clone().reverse().limit(1)', async () =>
      pick(d, await old().clone().reverse().limit(1).toArray()),
    ),
    d.step('Original again', 'The original is unchanged.', 'collection.toArray()', async () => {
      const collection = old();
      collection.clone().reverse().limit(1);
      pick(d, await collection.toArray());
    }),
    d.step('No clone', 'Without clone() it changes too.', 'collection.reverse().limit(1)', async () => {
      const collection = old();
      collection.reverse().limit(1);
      pick(d, await collection.toArray());
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
