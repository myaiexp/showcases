// on("populate") fills a new database with starter rows, exactly once in its lifetime
import type Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const STATUSES = ['opened', 'closed', 'resolved', 'wontfix'];

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'populate', side: 'log' });
  const { lab, log } = d;
  const seeded = (x: Dexie): void => {
    x.on('populate', (tx) => {
      log.add('populate fired: 4 rows added', 'warn');
      return tx.table('statuses').bulkAdd(STATUSES.map((name) => ({ name })));
    });
  };
  const open = async (version: 1 | 2): Promise<void> => {
    log.add(`opening version ${version}`, 'info');
    await lab.open((x) => {
      seeded(x);
      x.version(version).stores({ statuses: version === 1 ? '++id, name' : '++id, name, openess' });
    });
    lab.show('statuses', [ID, 'name']);
  };
  d.say.set('Starter rows, added once.', "db.on('populate', tx => ...)");
  d.run([
    d.step('First open', 'A new database fires populate.', "db.on('populate', tx => tx.statuses.bulkAdd(...))", async () => {
      await lab.wipe();
      log.clear();
      await open(1);
    }),
    d.step('Delete "wontfix"', 'Someone removes a starter row.', 'db.statuses.delete(4)', async () => {
      await lab.db.table('statuses').delete(4);
      log.add('user deleted "wontfix"', 'muted');
    }),
    d.step('Open again', 'Same database: populate stays quiet.', 'new Dexie(...).open()', async () => {
      await open(1);
      log.add('populate did not fire', 'ok');
    }),
    d.step('Upgrade to version 2', 'An upgrade does not populate either.', "version(2).stores({ statuses: '++id, name, openess' })", async () => {
      await open(2);
      log.add('populate did not fire', 'ok');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
