// Dexie.waitFor() keeps a transaction alive while other async work finishes
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, settle, why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('The same 80 ms timer, but waited for.');
  d.run([
    d.step('waitFor(timer)', 'waitFor keeps it open: both saved.', 'await Dexie.waitFor(timer(80))', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await t.put({ id: 3, name: 'Carol', balance: 20 });
        log.add('Carol written');
        log.add('waiting 80 ms inside waitFor', 'muted');
        await Dexie.waitFor(stage.wait(80));
        log.add('timer done, writing Dan');
        await t.put({ id: 4, name: 'Dan', balance: 5 });
        log.add('Dan written');
      });
      await settle(log, p);
    }, 2800),
    d.step('Use table while waiting', 'Not allowed: do not touch the table.', 'waitFor(async () => get(...))', async () => {
      log.clear();
      const p = db.transaction('rw', t, async () => {
        await Dexie.waitFor(
          (async () => {
            await stage.wait(80);
            const err = await t.get(1).then(() => null, (e: unknown) => e);
            log.add(err ? `inside waitFor: ${why(err)}` : 'inside waitFor: worked', 'warn');
          })(),
        );
        const alice = await t.get(1);
        log.add(`after waitFor: Alice has ${alice.balance}`, 'ok');
      });
      await settle(log, p);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
