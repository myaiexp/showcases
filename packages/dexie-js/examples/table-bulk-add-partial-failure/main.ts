// Table.bulkAdd() catching a BulkError keeps the rows that worked
import type { Mount } from '@/types.ts';
import { demo, attempt, friends, FRIEND_COLS } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS });
  const { stage, db, t, say, view, out } = d;
  say.set('Three friends, ids 1 to 3.');
  d.run([
    d.step('Add 4, two clash', 'Clashes are listed, the rest is kept.', 'bulkAdd([...]).catch(BulkError)', async () => {
      const r = await attempt(
        t.bulkAdd([
          { id: 4, name: 'Ulla Bella', age: 87 },
          { id: 2, name: 'Clash', age: 1 },
          { id: 5, name: 'Elna', age: 99 },
          { id: 3, name: 'Clash', age: 2 },
        ]),
      );
      const failed = Object.entries(r.error?.failuresByPos ?? {});
      out.list(failed.map(([pos, e]) => `row ${Number(pos) + 1} failed: ${e.name}`), 'bad');
    }, 3200),
  ]);

  return stage.dispose;
};

export default mount;
