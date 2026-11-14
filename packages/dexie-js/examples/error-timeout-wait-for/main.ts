// TimeoutError: waitFor() gives up on a slow promise, the transaction undoes
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { attempt, demo, friends, ID_COL } from '../../shared/demo.ts';
import { showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name', seed: friends(2), columns: [ID_COL, 'name'] });
  const { stage, db, t, out } = d;
  d.say.set('Save a row, then wait for something slow.', 'await Dexie.waitFor(promise, ms)');
  d.run([
    d.step('Wait too long', 'The 0.3 s limit passes: all undone.', 'waitFor(slowPromise, 300)', async () => {
      const r = await attempt(
        db.transaction('rw', t, async () => {
          await t.put({ id: 3, name: 'Sara' });
          await Dexie.waitFor(stage.wait(1500), 300);
        }),
      );
      showError(out, r.error);
    }, 2800),
    d.step('A roomier limit', 'The wait ends in time: saved.', 'waitFor(shortPromise, 1000)', async () => {
      await db.transaction('rw', t, async () => {
        await t.put({ id: 3, name: 'Sara' });
        await Dexie.waitFor(stage.wait(150), 1000);
      });
      out.value('saved', 'the wait finished in time');
    }),
  ]);
  return stage.dispose;
};

export default mount;
