// db.unuse() removes a middleware by name; a reopen makes it final
import type { Middleware, DBCore } from 'dexie';
import type { Mount } from '@/types.ts';
import { FRIEND_COLS, friends } from '../../shared/demo.ts';
import { plainDemo } from '../../shared/hook-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = plainDemo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, db, t, log, out } = d;
  let watching = false;
  const spy: Middleware<DBCore> = {
    stack: 'dbcore',
    name: 'Spy',
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) => {
            if (watching) log.add(`spy saw: ${req.type}`, 'warn');
            return table.mutate(req);
          },
        };
      },
    }),
  };
  db.use(spy);
  let age = 20;
  const write = async (): Promise<void> => {
    log.clear();
    watching = true;
    try {
      age = age >= 29 ? 21 : age + 1; // stays in a small range however long a card loops
      await t.put({ id: 1, name: 'Josephine', age });
    } finally {
      watching = false;
    }
  };
  const reopen = async (): Promise<void> => {
    db.close();
    await db.open();
  };
  d.say.set('A spy named "Spy" is installed.', "db.use({ stack: 'dbcore', name: 'Spy', create })");
  d.run([
    d.step('Write', 'The spy sees the write.', 't.put({ id: 1, ... })', async () => {
      await write();
      out.value('spied', 'the log has a line');
    }),
    d.step('unuse(), write', 'Removed, yet it still sees it.', "db.unuse({ stack: 'dbcore', name: 'Spy' })", async () => {
      db.unuse({ stack: 'dbcore', name: 'Spy' });
      await write();
      out.value('still spied', 'the open database keeps its stack', 'warn');
    }),
    d.step('Reopen, write', 'A fresh open() builds a spy-free stack.', 'db.close(); await db.open()', async () => {
      await reopen();
      await write();
      out.value('not spied', 'nothing in the log');
    }),
    d.step('use() and reopen', 'Put it back: reopen to make it count.', 'db.use(spy); db.close(); db.open()', async () => {
      db.use(spy);
      await reopen();
      await write();
      out.value('spied', 'back in the stack');
    }),
  ]);
  return stage.dispose;
};

export default mount;
