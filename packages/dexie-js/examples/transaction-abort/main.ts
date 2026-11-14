// Transaction.abort() cancels a transaction on purpose, e.g. when a check fails
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, settle, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Cancel a transaction from the inside.');
  d.run([
    d.step('Abort after a write', 'abort(): the write is discarded.', 'Dexie.currentTransaction.abort()', async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, async () => {
        watch(log);
        await t.put({ id: 3, name: 'Zlatan', balance: 47 });
        log.add('Zlatan added (inside)');
        Dexie.currentTransaction.abort();
      }));
    }, 2600),
    d.step('Overdraft check', 'Too poor to pay 500: abort.', 'if (low) tx.abort()', async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, async (tx) => {
        watch(log);
        await t.update(2, { balance: 1000 });
        const alice = await t.get(1);
        log.add(`Alice has ${alice.balance}, needs 500`);
        if (alice.balance < 500) return tx.abort();
        await t.update(1, { balance: alice.balance - 500 });
      }));
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
