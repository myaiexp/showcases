// A mode ending in "!" always opens its own transaction, whatever transaction is running
import type { Mount } from '@/types.ts';
import { audit } from '../../shared/audit-kit.ts';

const mount: Mount = (el, ctx) => {
  const a = audit(el, ctx);
  const { stage, db, accounts, logs } = a;
  a.say.set('A logger used from inside a payment.');
  const logger = (mode: 'rw' | 'rw!') => (text: string) => db.transaction(mode, logs, () => logs.add({ text }));
  a.run([
    a.step('Logger with "rw"', 'It joins the payment, but misses a table.', "transaction('rw', logs, ...)", async () => {
      const note = logger('rw');
      await a.verdict(
        db.transaction('rw', accounts, async () => {
          await accounts.update(1, { balance: 90 });
          await note('paid 10');
        }),
        'saved',
        'Payment undone',
      );
    }, 2800),
    a.step('Logger with "rw!"', '"rw!": its own transaction, kept.', "transaction('rw!', logs, ...)", async () => {
      const note = logger('rw!');
      await a.verdict(
        db.transaction('rw', accounts, async () => {
          await accounts.update(1, { balance: 90 });
          await note('payment tried');
          throw new Error('declined');
        }),
        'saved',
        'Payment undone, note kept',
      );
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
