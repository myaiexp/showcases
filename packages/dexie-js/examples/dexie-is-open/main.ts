// db.isOpen() reported after every step of the database's life
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'isopen', side: 'log' });
  const { lab, log } = d;
  const ask = (what: string): void => {
    const open = lab.db.isOpen();
    log.add(`${what}: ${open}`, open ? 'ok' : 'warn');
  };
  d.say.set('Is it open right now?', 'db.isOpen()');
  d.run([
    d.step('Declare', 'Declared only: nothing is open yet.', "new Dexie(name).version(1).stores(...)", async () => {
      await lab.wipe();
      lab.next((x) => x.version(1).stores({ friends: '++id, name' }));
      ask('declared');
    }),
    d.step('First query', 'Using it opens it.', "await db.friends.count()", async () => {
      await lab.db.table('friends').count();
      ask('after first query');
    }),
    d.step('close()', 'Closed on purpose.', 'db.close()', async () => {
      lab.db.close();
      ask('after close()');
    }),
    d.step('open()', 'Opened again by hand.', 'await db.open()', async () => {
      await lab.db.open();
      ask('after open()');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
