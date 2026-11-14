// Catching a failed write inside a transaction marks it handled, so the transaction commits
import type { Mount } from '@/types.ts';
import { bank, settle, watch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Add Carol and a clashing row.');
  const attemptBoth = (handle: boolean): Promise<unknown> =>
    db.transaction('rw', t, () => {
      watch(log);
      t.put({ id: 3, name: 'Carol', balance: 20 });
      const clash = t.add({ id: 2, name: 'Bob again', balance: 0 });
      if (handle) clash.catch(() => log.add('caught the clash', 'warn'));
    });
  d.run([
    d.step('Not caught', 'Not caught: all undone.', 'add(id 2)  // fails, uncaught', async () => {
      log.clear();
      await settle(log, attemptBoth(false));
    }, 2600),
    d.step('Caught', 'Caught: handled, so Carol is kept.', 'add(id 2).catch(() => {})', async () => {
      log.clear();
      await settle(log, attemptBoth(true));
    }, 2600),
  ]);
  return stage.dispose;
};

export default mount;
