// Transaction.on('complete') fires once everything is saved, read-only or not
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Ask to be told when it is done.');
  d.run([
    d.step('Write', "Saved: 'complete' fires after.", "tx.on('complete', fn)", async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        Dexie.currentTransaction.on('complete', () => log.add("on('complete') fired", 'ok'));
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        log.add('Carol added (inside)');
      });
      await settle(log, p, 'then(): promise resolved');
    }),
    d.step('Read only', "'r' transactions complete too.", "db.transaction('r', ...)", async () => {
      log.clear();
      const p = db.transaction('r', t, async () => {
        Dexie.currentTransaction.on('complete', () => log.add("on('complete') fired", 'ok'));
        log.add(`counted ${await t.count()} accounts`);
      });
      await settle(log, p, 'then(): promise resolved');
    }),
  ]);
  return stage.dispose;
};

export default mount;
