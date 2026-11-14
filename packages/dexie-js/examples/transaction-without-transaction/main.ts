// The same failing transfer without a transaction loses money; with one it does not
import type { Mount } from '@/types.ts';
import { attempt } from '../../shared/demo.ts';
import { bank, total, transfer, why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('150 in the bank. Now a transfer breaks.');
  const money = async (): Promise<void> => log.add(`money in the bank: ${await total(t)}`, 'muted');
  d.run([
    d.step('No transaction', 'No transaction: step 1 stays saved.', 'await update(...); throw ...', async () => {
      log.clear();
      const r = await attempt(transfer(t, log, 30, { fail: true }));
      log.add(`failed: ${why(r.error)}`, 'bad');
      await money();
    }, 2600),
    d.step('In a transaction', 'In a transaction: nothing changes.', "db.transaction('rw', ...)", async () => {
      log.clear();
      const r = await attempt(db.transaction('rw', t, () => transfer(t, log, 30, { fail: true })));
      log.add(`failed: ${why(r.error)}`, 'bad');
      await money();
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
