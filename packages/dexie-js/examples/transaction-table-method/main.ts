// Transaction.table() gets a table by name from the transaction you were handed
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx, { extra: { logs: '++id, text' } });
  const { stage, db, t, log } = d;
  d.say.set('The callback receives the transaction.');
  d.run([
    d.step('tx.table("accounts")', 'Ask the transaction for a table.', "tx.table('accounts').update(...)", async () => {
      log.clear();
      const p = db.transaction('rw', 'accounts', async (tx) => {
        log.add(`tables in tx: ${tx.storeNames.join(', ')}`);
        await tx.table('accounts').update(1, { balance: 110 });
        log.add('Alice +10 via tx.table', 'ok');
      });
      await settle(log, p);
    }),
    d.step('tx.table("logs")', 'A table that is not part of it fails.', "tx.table('logs')  // not listed", async () => {
      log.clear();
      const p = db.transaction('rw', t, async (tx) => {
        await t.update(1, { balance: 120 });
        log.add('Alice +10 (inside)');
        tx.table('logs');
      });
      await settle(log, p);
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
