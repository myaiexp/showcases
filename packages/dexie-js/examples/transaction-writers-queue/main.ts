// Two read-write transactions on one table run one after the other; readers run side by side
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { bank, stopwatch } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set('Two transactions use one table.');
  d.run([
    d.step('Two writers', 'Writer B waits for writer A.', "transaction('rw', ...) x 2", async () => {
      log.clear();
      const at = stopwatch();
      const a = db.transaction('rw', t, async () => {
        await t.update(1, { balance: 101 });
        log.add(`${at()} A wrote, holds on`);
        await Dexie.waitFor(stage.wait(500));
        log.add(`${at()} A finished`, 'ok');
      });
      await stage.wait(100);
      log.add(`${at()} B wants to write`, 'warn');
      const b = db.transaction('rw', t, async () => {
        await t.update(2, { balance: 51 });
        log.add(`${at()} B wrote`, 'ok');
      });
      await Promise.all([a, b]);
    }, 2800),
    d.step('Two readers', 'Readers do not wait for each other.', "transaction('r', ...) x 2", async () => {
      log.clear();
      const at = stopwatch();
      const reader = (name: string): Promise<void> =>
        db.transaction('r', t, async () => {
          await t.get(1);
          log.add(`${at()} ${name} read, holds on`);
          await Dexie.waitFor(stage.wait(400));
          log.add(`${at()} ${name} finished`, 'ok');
        });
      const a = reader('A');
      await stage.wait(100);
      await Promise.all([a, reader('B')]);
    }, 2800),
  ]);
  return stage.dispose;
};

export default mount;
