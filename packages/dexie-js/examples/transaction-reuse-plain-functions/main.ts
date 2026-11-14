// Plain functions without their own transaction run inside whichever one the caller opens
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('A helper that adds 5 interest.');
  // No transaction in here: it joins one if the caller opened one.
  const interest = (id: number): Promise<number> =>
    t.where('id').equals(id).modify((a: { balance: number }) => {
      a.balance += 5;
    });
  d.run([
    d.step('Call alone', 'Alone, each call saves on its own.', 'interest(1); interest(2)', async () => {
      log.clear();
      await interest(1);
      log.add('interest(1): saved', 'ok');
      await interest(2);
      log.add('interest(2): saved', 'ok');
    }),
    d.step('Call in one transaction', 'In a transaction: all or nothing.', 'transaction(() => { interest...; throw })', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await interest(1);
        await interest(2);
        log.add('both calls ran (inside)');
        throw new Error('stop');
      });
      await settle(log, p);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
