// put() fires hook('creating') for a new key, hook('updating') for an old one
import type { Mount } from '@/types.ts';
import { demo, FRIEND_COLS, friends } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, t, log } = d;
  t.hook('creating', (_primKey, obj) => {
    log.add(`creating: ${obj.name}`, 'ok');
  });
  t.hook('updating', (mods, _primKey, obj) => {
    log.add(`updating: ${obj.name} (${Object.keys(mods).join(', ') || 'no changes'})`, 'warn');
  });
  d.say.set('Same call, put(). Which hook fires?', 'table.put(row)');
  d.run([
    d.step('put() a new id', 'No such id yet: a creation.', "t.put({ id: 4, name: 'Elna', age: 99 })", async () => {
      log.clear();
      await t.put({ id: 4, name: 'Elna', age: 99 });
    }),
    d.step('put() an existing id', 'The id exists: an update.', "t.put({ id: 2, name: 'Per', age: 76 })", async () => {
      log.clear();
      await t.put({ id: 2, name: 'Per', age: 76 });
    }),
    d.step('put() the same row', 'Even a no-change put is an update.', "t.put({ id: 2, name: 'Per', age: 76 })", async () => {
      log.clear();
      await t.put({ id: 2, name: 'Per', age: 76 });
    }),
  ]);
  return stage.dispose;
};

export default mount;
