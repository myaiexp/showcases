// PrematureCommitError: a transaction that waits on a timer has already committed
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';
import { errorOf, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, db, t, out } = d;
  d.say.set('A transaction closes when it has nothing to do.', "db.transaction('rw', t, scope)");
  d.run([
    d.step('Wait on a timer', 'A timer is not database work: too late.', "db.transaction('rw', t, () => timer(100))", async () => {
      showError(out, await errorOf(() => db.transaction('rw', t, () => stage.wait(100))));
    }, 2800),
    d.step('Database work only', 'Only Dexie calls inside: it commits fine.', "db.transaction('rw', t, () => t.add(...))", async () => {
      await db.transaction('rw', t, async () => {
        await t.add({ id: 3, name: 'Sara' });
      });
      out.value('committed', 'the add was saved');
    }),
  ]);
  return stage.dispose;
};

export default mount;
