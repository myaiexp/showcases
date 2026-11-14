// Table.bulkAdd() inside a transaction rolls back unless the error is caught
import type { Mount } from '@/types.ts';
import { demo, attempt, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends, ids 1 to 3.');
  d.run([
    d.step('Not caught', 'Uncaught: everything is rolled back.', "db.transaction('rw', t, () => bulkAdd(...))", async () => {
      const r = await attempt(db.transaction('rw', t, () => t.bulkAdd([{ id: 4, name: 'Ulla Bella', age: 87 }, { id: 2, name: 'Clash', age: 1 }])));
      out.value(r.error?.name, 'row 4 was fine, but it is gone too', 'bad');
    }),
    d.step('Caught inside', 'Caught inside: good rows saved.', 'bulkAdd(...).catch(() => {})', async () => {
      await db.transaction('rw', t, async () => {
        await t.bulkAdd([{ id: 5, name: 'Elna', age: 99 }, { id: 3, name: 'Clash', age: 2 }]).catch(() => undefined);
      });
      out.value('row 5 saved', 'row 3 skipped');
    }),
  ]);

  return stage.dispose;
};

export default mount;
