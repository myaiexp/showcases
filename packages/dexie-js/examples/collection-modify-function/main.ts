// collection.modify(function): change each row based on its own old value
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, out } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Everyone +1', 'Everyone gets a year older.', 'toCollection().modify(f => { f.age++ })', async () =>
      out.value(await t.toCollection().modify((friend) => { friend.age++; }), 'rows modified'),
    ),
    d.step('Only over 60', 'Only the over-60s age again.', "where('age').above(60).modify(...)", async () =>
      out.value(await t.where('age').above(60).modify((friend) => { friend.age++; }), 'rows modified'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
