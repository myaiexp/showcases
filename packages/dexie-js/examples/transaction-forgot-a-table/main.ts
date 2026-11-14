// A function that touches a table the transaction left out makes the whole transaction fail
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx, { extra: { logs: '++id, text' } });
  const { stage, db, t, log } = d;
  const logs = db.table('logs');
  d.say.set('Pay 10, and write a note in a 2nd table.');
  // A reusable function: it uses whichever transaction its caller opened.
  const pay = async (): Promise<void> => {
    await t.update(1, { balance: 90 });
    log.add('Alice paid 10 (inside)');
    await logs.add({ text: 'paid 10' });
    log.add('note written (inside)');
  };
  d.run([
    d.step('Forgot "logs"', 'Table left out: the payment is undone.', "transaction('rw', accounts, pay)", async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, pay));
    }, 2800),
    d.step('List both', 'Both tables listed: all saved.', "transaction('rw', accounts, logs, pay)", async () => {
      log.clear();
      await settle(log, db.transaction('rw', t, logs, pay));
    }),
  ]);
  return stage.dispose;
};

export default mount;
