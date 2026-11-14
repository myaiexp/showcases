// A transaction opened as 'r' cannot write: the write fails with ReadOnlyError
import type { Mount } from '@/types.ts';
import { bank, settle } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = bank(el, ctx);
  const { stage, db, t, log } = d;
  d.say.set("'r' is for reading, 'rw' for writing.");
  const run = (mode: 'r' | 'rw'): Promise<unknown> =>
    db.transaction(mode, t, async () => {
      log.add(`mode '${mode}': reading`);
      const alice = await t.get(1);
      log.add(`Alice has ${alice.balance}`);
      await t.update(1, { balance: alice.balance + 10 });
      log.add('wrote +10');
    });
  d.run([
    d.step("Write in 'r'", "Read-only: writing fails.", "transaction('r', accounts, ...)", async () => {
      log.clear();
      await settle(log, run('r'));
    }, 2600),
    d.step("Write in 'rw'", "Read-write: the write works.", "transaction('rw', accounts, ...)", async () => {
      log.clear();
      await settle(log, run('rw'));
    }),
  ]);
  return stage.dispose;
};

export default mount;
