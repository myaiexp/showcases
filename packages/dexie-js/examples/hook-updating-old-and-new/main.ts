// hook('updating') is told what changes and sees the row as it was before
import type { Mount } from '@/types.ts';
import { demo, friends } from '../../shared/demo.ts';
import { fmt } from '../../shared/format.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: 'id, name, age',
    seed: friends(3),
    columns: [{ field: 'id', width: '2.2em' }, 'name', { field: 'age', width: '3em' }],
    side: 'log',
  });
  const { stage, t, log } = d;
  t.hook('updating', (mods, _primKey, obj) => {
    for (const [field, now] of Object.entries(mods)) log.add(`${obj.name}: ${field} ${fmt(obj[field])} → ${fmt(now)}`, 'warn');
  });
  d.say.set('The hook reports each change as before → after.', 'hook(updating, (mods, key, obj) => ...)');
  d.run([
    d.step('Change one field', 'mods holds only what changes.', "t.update(1, { age: 22 })", async () => {
      log.clear();
      await t.update(1, { age: 22 });
    }),
    d.step('Change two fields', 'Two fields, two lines.', "t.update(2, { name: 'Pelle', age: 76 })", async () => {
      log.clear();
      await t.update(2, { name: 'Pelle', age: 76 });
    }),
    d.step('A birthday for everyone', 'One modify() call, one report per row.', 'toCollection().modify(f => { f.age++ })', async () => {
      log.clear();
      await t.toCollection().modify((f: { age: number }) => {
        f.age++;
      });
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
