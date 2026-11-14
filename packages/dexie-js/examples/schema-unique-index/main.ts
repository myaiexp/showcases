// "&email": a unique index refuses a second row with the same email; a plain index does not
import type { Mount } from '@/types.ts';
import { attempt, demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, name, &email',
    seed: [
      { id: 1, name: 'Josephine', email: 'jo@x.se' },
      { id: 2, name: 'Per', email: 'per@x.se' },
    ],
    columns: ctx.preview ? ['name', 'email'] : [ID_COL, 'name', 'email'],
  });
  const { stage, t, say, view, out } = d;
  say.set('& means no two rows share the value.', "stores({ friends: '++id, name, &email' })");
  d.run([
    d.step('A new email', 'A fresh email is fine.', "add({ name: 'Sara', email: 'sara@x.se' })", async () => {
      out.value(await t.add({ name: 'Sara', email: 'sara@x.se' }), 'stored');
    }),
    d.step('The same email', 'Second jo@x.se is refused.', "add({ name: 'Jo2', email: 'jo@x.se' })", async () => {
      const { error } = await attempt(t.add({ name: 'Jo2', email: 'jo@x.se' }));
      out.value(error?.name ?? 'stored', 'nothing was added', 'bad');
      view.mark((r) => r.email === 'jo@x.se', 'bad');
    }),
    d.step('The same name', 'name is a plain index: repeats are fine.', "add({ name: 'Per', email: 'per2@x.se' })", async () => {
      out.value(await t.add({ name: 'Per', email: 'per2@x.se' }), 'stored: no & on name');
      view.mark((r) => r.name === 'Per');
    }),
  ]);
  return stage.dispose;
};

export default mount;
