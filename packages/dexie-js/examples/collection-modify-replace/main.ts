// collection.modify(): replace the whole object with ref.value = ...
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(6), columns: FRIEND_COLS });
  const { t, say, view, out } = d;
  say.set('Six friends are stored.', "stores: 'id, name, age'");
  d.run([
    d.step('Find over 80', 'Who is over 80?', "where('age').above(80)", async () =>
      view.mark(await t.where('age').above(80).primaryKeys()),
    ),
    d.step('Replace them', 'Swap each for a new friend.', 'modify((value, ref) => { ref.value = {...} })', async () =>
      out.value(
        await t.where('age').above(80).modify((value, ref) => {
          ref.value = { id: value.id, name: 'Another Friend', age: 0 };
        }),
        'rows replaced',
      ),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
