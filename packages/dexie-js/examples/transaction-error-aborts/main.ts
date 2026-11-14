// Any exception inside a transaction, even a typo, undoes the writes made before it
import type { Mount } from '@/types.ts';
import { bank, settle, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Add Carol, then something goes wrong.');
  d.run([
    d.step('Typo after the add', 'A typo aborts: Carol is not saved.', 'Typo.Missing = 3  // TypeError', async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, async () => {
        watch(log);
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        log.add('Carol added (inside)');
        (window as unknown as { Typo: { Missing: number } }).Typo.Missing = 3;
      }));
    }, 2600),
    d.step('No typo', 'No error: Carol is saved.', "db.transaction('rw', accounts, ...)", async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, async () => {
        watch(log);
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        log.add('Carol added (inside)');
      }));
    }),
  ]);
  return stage.dispose;
};

export default mount;
