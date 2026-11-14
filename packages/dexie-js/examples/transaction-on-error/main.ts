// Transaction.on('error') hands you the error that made the transaction fail
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, settle, why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Be told why a transaction failed.');
  const run = (cause: () => unknown): Promise<unknown> =>
    db.transaction('rw', t, async () => {
      Dexie.currentTransaction.on('error', (e: unknown) => log.add(`on('error'): ${why(e)}`, 'warn'));
      await cause();
    });
  d.run([
    d.step('Clashing key', "'error' names the failed write.", 'tx.on(\'error\', e => ...)', async () => {
      log.clear();
      await settle(log, run(() => t.add({ id: 1, name: 'Copy', balance: 0 })));
    }, 2400),
    d.step('Thrown error', "It reports thrown errors too.", "throw new Error('Bank is closed')", async () => {
      log.clear();
      await settle(log, run(() => { throw new Error('Bank is closed'); }));
    }, 2400),
    d.step('All fine', 'No error: no event.', 'put({ id: 3, ... })', async () => {
      log.clear();
      await settle(log, run(() => t.put({ id: 3, name: 'Carol', balance: 20 })));
    }),
  ]);
  return stage.dispose;
};

export default mount;
