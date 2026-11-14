// collection.until(): keep rows until one passes a stop test
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say } = d;
  say.set('Walk friends by age.', "orderBy('age')");
  d.run([
    d.step('until age > 60', 'Stop at the first over 60.', "orderBy('age').until(f => f.age > 60)", async () =>
      pick(d, await t.orderBy('age').until((f) => f.age > 60).toArray()),
    ),
    d.step('Include stop row', 'Keep the stopping row too.', '.until(f => f.age > 60, true)', async () =>
      pick(d, await t.orderBy('age').until((f) => f.age > 60, true).toArray()),
    ),
    d.step('From the old end', 'Oldest first, stop under 60.', "orderBy('age').reverse().until(...)", async () =>
      pick(d, await t.orderBy('age').reverse().until((f) => f.age < 60).toArray()),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
