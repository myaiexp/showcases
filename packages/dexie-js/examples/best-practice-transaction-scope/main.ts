// Several writes in one transaction() succeed together or not at all
import type { Mount } from '@/types.ts';
import { attempt, demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, &name',
    seed: [{ id: 1, name: 'Sara' }],
    columns: [ID_COL, 'name'],
    side: 'log',
  });
  const { stage, db, t, say, log } = d;
  say.set('Add three people. Sara is already there.', "stores({ friends: '++id, &name' })");
  d.run([
    d.step('One by one', 'The last add fails, the first two stay.', 'await add(Måns); add(Nils); add(Sara)', async () => {
      log.clear();
      for (const name of ['Måns', 'Nils', 'Sara']) {
        const { error } = await attempt(t.add({ name }));
        log.add(error ? `${name}: refused (${error.name})` : `${name}: added`, error ? 'bad' : 'ok');
        await stage.wait(450);
      }
      log.add('Måns and Nils stayed behind', 'warn');
    }, 2600),
    d.step('In a transaction', 'The last add fails, so all are undone.', "db.transaction('rw', db.friends, ...)", async () => {
      log.clear();
      const { error } = await attempt(
        db.transaction('rw', t, async () => {
          for (const name of ['Kate', 'David', 'Sara']) {
            await t.add({ name });
            log.add(`${name}: added, so far`, 'info');
          }
        }),
      );
      log.add(`rolled back (${error?.name ?? 'no error'})`, 'ok');
      log.add('Kate and David are not stored', 'ok');
    }),
  ]);
  return stage.dispose;
};

export default mount;
