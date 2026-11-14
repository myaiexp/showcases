// Dexie.ignoreTransaction() writes an audit row that survives the transaction's rollback
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { audit } from '../../shared/audit-kit.ts';

const mount: Mount = (el, ctx) => {
  const a = audit(el, ctx);
  const { stage, db, accounts, logs } = a;
  a.say.set('A payment is declined. Is it logged?');
  a.run([
    a.step('Log inside', 'Logged inside: the note is undone too.', "logs.add(...)  // in the transaction", async () => {
      await a.verdict(
        db.transaction('rw', accounts, logs, async () => {
          await accounts.update(1, { balance: 90 });
          await logs.add({ text: 'paid 10' });
          throw new Error('declined');
        }),
        'saved',
        'Declined, note undone',
      );
    }, 2800),
    a.step('ignoreTransaction', 'Logged outside: the note stays.', 'Dexie.ignoreTransaction(() => logs.add())', async () => {
      await a.verdict(
        db.transaction('rw', accounts, async () => {
          await accounts.update(1, { balance: 90 });
          await Dexie.ignoreTransaction(() => logs.add({ text: 'declined' }));
          throw new Error('declined');
        }),
        'saved',
        'Declined, note kept',
      );
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
