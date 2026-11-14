// hook('creating') refuses a row by throwing: the add fails, nothing is stored
import type { Mount } from '@/types.ts';
import { attempt, bare, demo, FRIEND_COLS, friends } from '../../shared/demo.ts';
import { showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: '++id, name, age', seed: bare(friends(2)), columns: FRIEND_COLS });
  const { stage, t, out } = d;
  t.hook('creating', (_primKey, obj) => {
    if (!obj.name) throw new Error('A friend needs a name');
    if (obj.age < 0) throw new Error('Age cannot be negative');
  });
  d.say.set('The hook checks every new row.', "if (!obj.name) throw new Error('A friend needs a name')");
  d.run([
    d.step('Add a valid row', 'It passes the check and is stored.', "t.add({ name: 'Sara', age: 50 })", async () => {
      out.value(await t.add({ name: 'Sara', age: 50 }), 'id of the new row');
    }),
    d.step('Add with no name', 'The hook throws: nothing is stored.', "t.add({ age: 30 })", async () => {
      const r = await attempt(t.add({ age: 30 }));
      showError(out, r.error);
    }, 2600),
    d.step('Add a negative age', 'Refused too. The grid is unchanged.', "t.add({ name: 'Zed', age: -4 })", async () => {
      const r = await attempt(t.add({ name: 'Zed', age: -4 }));
      showError(out, r.error);
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
