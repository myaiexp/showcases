// hook('creating') fills in a default when a new row leaves a field out
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: '++id, name, role', columns: [ID_COL, 'name', { field: 'role', width: '4.6em' }] });
  const { stage, t, out } = d;
  t.hook('creating', (_primKey, obj) => {
    if (obj.role === undefined) obj.role = 'friend';
  });
  d.say.set('A row without a role gets "friend".', "if (obj.role === undefined) obj.role = 'friend'");
  const addAndShow = async (row: { name: string; role?: string }): Promise<void> => {
    const id = await t.add(row);
    const stored = await t.get(id);
    out.value(stored.role, row.role ? 'role you passed: kept' : 'no role passed: default filled in');
  };
  d.run([
    d.step('Add without a role', 'No role given: the hook fills it in.', "t.add({ name: 'Sara' })", () => addAndShow({ name: 'Sara' })),
    d.step('Add with a role', 'A role was given: left alone.', "t.add({ name: 'Mum', role: 'family' })", () =>
      addAndShow({ name: 'Mum', role: 'family' })),
    d.step('Add another without', 'The default applies every time.', "t.add({ name: 'Per' })", () => addAndShow({ name: 'Per' })),
  ]);
  return stage.dispose;
};

export default mount;
