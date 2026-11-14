// Dexie.currentTransaction: null outside a transaction, the running one inside it
import Dexie, { type Transaction } from 'dexie';
import type { Mount } from '@/types.ts';
import { bank } from '../../shared/tx-kit.ts';

const describe = (tx: Transaction | null): string =>
  tx ? `${tx.mode === 'readwrite' ? 'rw' : 'r'} [${tx.storeNames.join(', ')}] active=${tx.active}` : 'null';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Where am I running?');
  // Any function can ask, with no transaction passed in.
  const whereAmI = (label: string): void => log.add(`${label}: ${describe(Dexie.currentTransaction)}`, Dexie.currentTransaction ? 'ok' : 'muted');
  d.run([
    d.step('Look around', 'Ask from different places.', 'Dexie.currentTransaction', async () => {
      log.clear();
      whereAmI('before');
      await db.transaction('rw', t, async () => {
        whereAmI('in scope');
        await t.get(1);
        whereAmI('after await');
        await Dexie.ignoreTransaction(async () => whereAmI('ignored'));
      });
      whereAmI('after');
    }, 3600),
  ]);
  return stage.dispose;
};

export default mount;
