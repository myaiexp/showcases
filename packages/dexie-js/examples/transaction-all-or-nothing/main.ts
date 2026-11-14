// A money transfer in one transaction: if the second step fails, the first is undone
import type { Mount } from '@/types.ts';
import { bank, settle, transfer, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Alice sends Bob money: two writes.');
  d.run([
    d.step('Transfer 30', 'Both steps work: both are kept.', "db.transaction('rw', accounts, ...)", async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, () => {
        watch(log);
        return transfer(t, log, 30);
      }), 'committed: both saved');
    }),
    d.step('Step 2 fails', 'Step 2 fails: step 1 is undone.', "throw new Error('...') after step 1", async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, () => {
        watch(log);
        return transfer(t, log, 30, { fail: true });
      }));
      const a = await t.get(1);
      log.add(`Alice still has ${a.balance}`, 'muted');
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
