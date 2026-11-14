// hook('creating') can return a primary key, so the table makes its own ids
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', columns: [{ field: 'id', width: '5em' }, 'name'] });
  const { stage, t, out } = d;
  // The key is only used when the caller gave none. The returned value must be an indexable key.
  t.hook('creating', (primKey, obj) => {
    if (primKey === undefined) return `user-${String(obj.name).toLowerCase()}`;
    return undefined;
  });
  d.say.set('No id given: the hook makes one from the name.', 'return `user-${name}`');
  d.run([
    d.step('Add without an id', 'The returned value becomes the key.', "t.add({ name: 'Sara' })", async () => {
      out.value(await t.add({ name: 'Sara' }), 'the key add() returned');
    }),
    d.step('Add another', 'Same rule, new name, new key.', "t.add({ name: 'Per' })", async () => {
      out.value(await t.add({ name: 'Per' }), 'the key add() returned');
    }),
    d.step('Pass your own id', 'A given key wins: the hook is ignored.', "t.add({ id: 'boss', name: 'Elna' })", async () => {
      out.value(await t.add({ id: 'boss', name: 'Elna' }), 'your key was kept');
    }),
  ]);
  return stage.dispose;
};

export default mount;
