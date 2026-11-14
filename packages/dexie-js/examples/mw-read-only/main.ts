// A middleware that refuses every write makes the database read-only
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { attempt, FRIEND_COLS, friends } from '../../shared/demo.ts';
import { plainDemo, showError } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  let readOnly = false;
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, beforeReseed: () => (readOnly = false) });
  const { stage, db, t, out } = d;
  db.use({
    stack: 'dbcore',
    name: 'ReadOnlyMode',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) =>
            readOnly
              ? Dexie.Promise.reject(new Dexie.ReadOnlyError('The database is in read-only mode'))
              : table.mutate(req),
        };
      },
    }),
  });
  d.say.set('Three friends. Writes are allowed.', 'mutate: req => readOnly ? reject : down.mutate(req)');
  d.run([
    d.step('Write while open', 'Writes go through.', "t.add({ id: 4, name: 'Elna', age: 99 })", async () => {
      readOnly = false;
      await t.add({ id: 4, name: 'Elna', age: 99 });
      out.value('saved', 'the middleware let it pass');
    }),
    d.step('Switch on read-only', 'One flag, and writes stop.', 'readOnly = true', () => {
      readOnly = true;
      out.value('read-only', 'writes are refused now', 'warn');
    }, 1500),
    d.step('Try to delete', 'Refused. The grid is unchanged.', 't.delete(1)', async () => {
      const r = await attempt(t.delete(1));
      showError(out, r.error);
    }, 2600),
    d.step('Reading still works', 'Reads pass straight through.', 't.toArray()', async () => {
      out.value(`${(await t.toArray()).length} rows`, 'read just fine');
      readOnly = false;
    }),
  ]);
  return stage.dispose;
};

export default mount;
