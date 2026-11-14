// A brand new database is built straight at the latest version: no upgrader runs
import type Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'fresh', side: 'log' });
  const { lab, log } = d;
  let ran = 0;
  const latest = (x: Dexie): void => {
    x.version(1).stores({ friends: '++id, name' });
    x.version(2).stores({ friends: '++id, firstName, lastName' }).upgrade((tx) => {
      ran++;
      log.add('upgrade() runs on old rows', 'warn');
      return tx.table('friends').toCollection().modify((f) => {
        [f.firstName, f.lastName] = String(f.name).split(' ');
        delete f.name;
      });
    });
  };
  d.say.set('The app ships version 2 with an upgrader.', 'version(2).stores(...).upgrade(...)');
  d.run([
    d.step('A new visitor', 'No old data: version 2 is built directly.', 'new Dexie(...) with version 1 and 2', async () => {
      await lab.wipe();
      log.clear();
      ran = 0;
      log.add('visitor has no database yet', 'muted');
      await lab.open(latest);
      lab.show('friends', [ID, 'firstName', 'lastName']);
      log.add('opened at version 2', 'ok');
      log.add(ran ? 'upgrader ran' : 'upgrader did not run', ran ? 'warn' : 'ok');
    }),
    d.step('A returning visitor', 'Old rows exist, so the upgrader runs.', 'same code, database already at version 1', async () => {
      await lab.wipe();
      log.clear();
      ran = 0;
      const old = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await old.table('friends').add({ name: 'Per Persson' });
      log.add('visitor stored "Per Persson" under version 1', 'muted');
      await lab.open(latest);
      lab.show('friends', [ID, 'firstName', 'lastName']);
      log.add('opened at version 2', 'ok');
      log.add(ran ? `upgrader ran on ${ran} upgrade` : 'upgrader did not run', ran ? 'warn' : 'ok');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
