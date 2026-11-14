// A middleware acts before forwarding a request and again on the answer
import type { Mount } from '@/types.ts';
import { attempt, FRIEND_COLS, friends } from '../../shared/demo.ts';
import { plainDemo, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(2), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log, out } = d;
  let watching = false;
  db.use({
    stack: 'dbcore',
    name: 'BeforeAndAfter',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) => {
            if (watching && (req.type === 'add' || req.type === 'put')) log.add(`before: ${req.type} ${req.values.length} rows`);
            return table.mutate(req).then((res) => {
              if (watching) log.add(`after: ${res.numFailures} failed`, res.numFailures ? 'bad' : 'ok');
              return res;
            });
          },
        };
      },
    }),
  });
  d.say.set('One hook point, two moments.', 'mutate: req => down.mutate(req).then(res => ...)');
  const watch = (label: string, text: string, code: string, fn: () => unknown) =>
    d.step(label, text, code, async () => {
      log.clear();
      watching = true;
      try {
        await fn();
      } finally {
        watching = false;
      }
    }, 2600);
  d.run([
    watch('Add two new rows', 'Before: two rows. After: none failed.', 'bulkAdd([id 3, id 4])', async () => {
      await t.bulkAdd([{ id: 3, name: 'Simon', age: 5 }, { id: 4, name: 'Sara', age: 50 }]);
      out.value('saved', 'both rows');
    }),
    watch('Add one that clashes', 'The answer says one failed.', 'bulkAdd([id 1 again, id 5])', async () => {
      const r = await attempt(t.bulkAdd([{ id: 1, name: 'Twin', age: 1 }, { id: 5, name: 'Elna', age: 99 }]));
      showError(out, r.error);
    }),
  ]);
  return stage.dispose;
};

export default mount;
