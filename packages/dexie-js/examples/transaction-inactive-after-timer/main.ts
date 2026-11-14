// Waiting on a timer inside a transaction lets it commit early: the next write fails
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('A transaction cannot wait for a timer.');
  d.run([
    d.step('Wait 80 ms', 'The timer outlasts the transaction.', 'await timer(80); await put(...)', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        log.add('Carol written');
        log.add('waiting 80 ms on a timer...', 'muted');
        await stage.wait(80);
        log.add('timer done, writing Dan');
        await t.put({ id: 4, name: 'Dan', balance: 5 });
        log.add('Dan written');
      });
      await settle(log, p);
      const carol = await t.get(3);
      log.add(carol ? 'Carol was saved anyway' : 'Carol was not saved', 'muted');
    }, 3200),
  ]);
  return stage.dispose;
};

export default mount;
