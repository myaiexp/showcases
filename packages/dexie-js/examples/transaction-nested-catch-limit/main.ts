// Catching a failed sub-transaction does not stop its parent transaction from aborting
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('A transaction inside a transaction fails.');
  const clash = (): Promise<unknown> => t.add({ id: 2, name: 'Bob again', balance: 0 });
  d.run([
    d.step('Catch the sub-transaction', 'Caught outside: parent still aborts.', 'transaction(...).catch(fn)', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        await db.transaction('rw', t, clash).catch(() => log.add('caught the sub-transaction', 'warn'));
        log.add('parent carries on...', 'muted');
      });
      await settle(log, p);
    }, 3000),
    d.step('Catch the write', 'Caught at the write: parent lives.', 'add(...).catch(fn)', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        await db.transaction('rw', t, () => clash().catch(() => log.add('caught the failed add', 'warn')));
        log.add('parent carries on...', 'muted');
      });
      await settle(log, p);
    }, 3000),
  ]);
  return stage.dispose;
};

export default mount;
