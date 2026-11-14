// ConstraintError: a unique index refuses a second row with the same value
import type { Mount } from '@/types.ts';
import { attempt, demo } from '../../shared/demo.ts';
import { showError } from '../../shared/hook-kit.ts';

const rows = [
  { id: 1, name: 'Sara', email: 'sara@a.org' },
  { id: 2, name: 'Per', email: 'per@a.org' },
];

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, &email', seed: rows, columns: ['name', 'email'] });
  const { stage, t, out } = d;
  d.say.set('Every email must be unique (&email).', "stores: 'id, name, &email'");
  d.run([
    d.step('A new email', 'A free email is accepted.', "t.add({ id: 3, email: 'elna@a.org' })", async () => {
      await t.add({ id: 3, name: 'Elna', email: 'elna@a.org' });
      out.value('saved', 'no clash');
    }),
    d.step('A copied email', 'Taken: refused, nothing is stored.', "t.add({ id: 9, email: 'sara@a.org' })", async () => {
      const r = await attempt(t.add({ id: 9, name: 'Twin', email: 'sara@a.org' }));
      showError(out, r.error);
    }, 2800),
    d.step('Change to a taken email', 'put() clashes the same way.', "t.put({ id: 2, email: 'sara@a.org' })", async () => {
      const r = await attempt(t.put({ id: 2, name: 'Per', email: 'sara@a.org' }));
      showError(out, r.error);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
