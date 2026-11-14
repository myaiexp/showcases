// Which table methods reach which hook: add, update, modify, delete and clear
import type { Mount } from '@/types.ts';
import { demo, FRIEND_COLS, friends } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(4), columns: FRIEND_COLS, side: 'log' });
  const { stage, t, log } = d;
  t.hook('creating', (_primKey, obj) => {
    log.add(`creating: ${obj.name}`, 'ok');
  });
  t.hook('updating', (mods, _primKey, obj) => {
    log.add(`updating: ${obj.name}`, 'warn');
  });
  t.hook('deleting', (_primKey, obj) => {
    log.add(`deleting: ${obj.name}`, 'bad');
  });
  d.say.set('Three hooks listen. Each call fires some.', 'creating, updating, deleting');
  const run = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => {
      log.clear();
      await fn();
    }, 2300);
  d.run([
    run('add()', 'A new row: creating.', "t.add({ id: 5, name: 'Kate', age: 89 })", () => t.add({ id: 5, name: 'Kate', age: 89 })),
    run('update()', 'A changed row: updating.', 't.update(1, { age: 22 })', () => t.update(1, { age: 22 })),
    run('modify()', 'Every matched row: updating.', "where('age').above(50).modify(...)", () =>
      t.where('age').above(50).modify((f: { age: number }) => {
        f.age += 1;
      })),
    run('delete()', 'A removed row: deleting.', 't.delete(2)', () => t.delete(2)),
    run('clear()', 'Every row goes: deleting each.', 't.clear()', () => t.clear()),
  ]);
  return stage.dispose;
};

export default mount;
