// Transaction.on('abort') tells you a transaction was rolled back, whatever the cause
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Be told when a transaction is undone.');
  const run = (cause: () => unknown): Promise<unknown> =>
    db.transaction('rw', t, async () => {
      Dexie.currentTransaction.on('abort', () => log.add("on('abort') fired", 'bad'));
      await t.put({ id: 3, name: 'Carol', balance: 20 });
      await cause();
    });
  d.run([
    d.step('Call abort()', "abort() also fires 'abort'.", 'Dexie.currentTransaction.abort()', async () => {
      log.clear();
      await settle(log, run(() => Dexie.currentTransaction.abort()));
    }, 2400),
    d.step('Throw an error', "A thrown error fires 'abort'.", "throw new Error('nope')", async () => {
      log.clear();
      await settle(log, run(() => { throw new Error('nope'); }));
    }, 2400),
    d.step('Clashing key', "So does a failed write.", 'add({ id: 1 })  // taken', async () => {
      log.clear();
      await settle(log, run(() => t.add({ id: 1, name: 'Copy', balance: 0 })));
    }, 2400),
  ]);
  return stage.dispose;
};

export default mount;
