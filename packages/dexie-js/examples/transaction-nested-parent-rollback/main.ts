// Transactions inside a transaction join it, so a later failure undoes the inner ones too
import type { Mount } from '@/types.ts';
import { bank, settle, why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('A function that has its own transaction.');
  const deposit = (id: number, n: number): Promise<void> =>
    db.transaction('rw', t, async () => {
      const a = await t.get(id);
      await t.update(id, { balance: a.balance + n });
    });
  d.run([
    d.step('Deposit twice', 'Alone, each deposit commits.', 'deposit(1, 10); deposit(2, 10)', async () => {
      log.clear();
      await deposit(1, 10);
      log.add('deposit 1: saved', 'ok');
      await deposit(2, 10);
      log.add('deposit 2: saved', 'ok');
    }),
    d.step('Inside a big one', 'Parent fails: both deposits undone.', "transaction(() => { deposit...; throw })", async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await deposit(1, 10);
        log.add('deposit 1 done (inside)');
        await deposit(2, 10);
        log.add('deposit 2 done (inside)');
        throw new Error('parent changes its mind');
      });
      await settle(log, p).then((e) => e && log.add(`reason: ${why(e)}`, 'muted'));
    }, 3000),
  ]);
  return stage.dispose;
};

export default mount;
