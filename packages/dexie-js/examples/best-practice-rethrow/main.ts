// Catching an error inside a transaction commits it unless you rethrow
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
  say.set('Sara exists, so adding her again fails.', "stores({ friends: '++id, &name' })");
  d.run([
    d.step('Catch and swallow', 'Logging it counts as handling it.', '.catch(err => console.error(err))', async () => {
      log.clear();
      await db.transaction('rw', t, async () => {
        await t.add({ name: 'Måns' });
        await t.add({ name: 'Sara' }).catch(() => log.add('Sara failed: logged only', 'warn'));
      });
      log.add('transaction committed', 'warn');
      log.add('Måns was stored anyway', 'warn');
    }),
    d.step('Catch, log, rethrow', 'throw err keeps the abort.', '.catch(err => { log(err); throw err })', async () => {
      log.clear();
      const { error } = await attempt(
        db.transaction('rw', t, async () => {
          await t.add({ name: 'Nils' });
          await t.add({ name: 'Sara' }).catch((err: Error) => {
            log.add('Sara failed: logged, rethrown', 'info');
            throw err;
          });
        }),
      );
      log.add(`transaction aborted (${error?.name ?? 'no error'})`, 'ok');
      log.add('Nils was not stored', 'ok');
    }),
  ]);
  return stage.dispose;
};

export default mount;
