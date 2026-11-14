// collection.offset(): skip the first N rows of a collection
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  const skip = (n: number) =>
    d.step(`offset(${n})`, `Skip the ${n} youngest.`, `orderBy('age').offset(${n})`, async () =>
      pick(d, await t.orderBy('age').offset(n).toArray()),
    );
  say.set('Six friends, youngest first.', "orderBy('age')");
  d.run([skip(2), skip(4), skip(10)]);
  return d.stage.dispose;
};

export default mount;
