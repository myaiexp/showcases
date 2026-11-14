// collection.desc(): sort a collection in descending order
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { desc, pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  say.set('Friends over 10, found by age.', "where('age').above(10)");
  d.run([
    d.step('Normal', 'Natural order: youngest first.', "where('age').above(10).toArray()", async () =>
      pick(d, await t.where('age').above(10).toArray()),
    ),
    d.step('desc()', 'desc(): oldest first.', "where('age').above(10).desc()", async () =>
      pick(d, await desc(t.where('age').above(10)).toArray()),
    ),
    d.step('desc() twice', 'Twice flips it back.', '.desc().desc()', async () =>
      pick(d, await desc(desc(t.where('age').above(10))).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
