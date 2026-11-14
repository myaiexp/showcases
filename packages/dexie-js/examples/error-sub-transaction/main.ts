// SubTransactionError: a transaction inside another must fit inside it
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', extra: { pets: '++id' }, seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, db, t, out } = d;
  const pets = db.table('pets');
  d.say.set('A transaction can start another one inside it.', 'db.transaction(mode, tables, fn)');
  d.run([
    d.step('Read-only outside', 'Inside wants to write: not allowed.', "transaction('r', t) { transaction('rw', t) }", async () => {
      await db.transaction('r', t, async () => {
        showError(out, await errorOf(() => db.transaction('rw', t, () => t.add({ id: 3, name: 'Sara' }))));
      });
    }, 2800),
    d.step('A table missing outside', 'Inside wants pets: not in the parent.', "transaction('rw', t) { transaction('rw', t, pets) }", async () => {
      await db.transaction('rw', t, async () => {
        showError(out, await errorOf(() => db.transaction('rw', t, pets, () => pets.add({ name: 'Rex' }))));
      });
    }, 2800),
    d.step('Fits inside', 'Same or fewer tables, same mode: fine.', "transaction('rw', t, pets) { transaction('rw', t) }", async () => {
      await db.transaction('rw', t, pets, async () => {
        await db.transaction('rw', t, () => t.add({ id: 4, name: 'Elna' }));
      });
      out.value('saved', 'the inner transaction fit');
    }),
  ]);
  return stage.dispose;
};

export default mount;
