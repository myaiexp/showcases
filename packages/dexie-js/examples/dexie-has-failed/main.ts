// db.hasFailed() is true once open() has been rejected
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { tryIt, versionDemo } from '../../shared/era.ts';

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'hasfailed', title: 'the two questions' });
  const { lab, out, stage } = d;
  const report = (db: Dexie, error?: Error): void => {
    out.list([`isOpen(): ${db.isOpen()}`, `hasFailed(): ${db.hasFailed()}`, error ? `error: ${error.name}` : 'no error'], error ? 'bad' : 'ok');
  };
  d.say.set('Two yes-or-no questions.', 'db.isOpen(), db.hasFailed()');
  d.run([
    d.step('A healthy database', 'It opens without trouble.', 'await db.open()', async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      report(db);
    }),
    d.step('Open a missing one', 'No schema declared, nothing stored: it fails.', "await new Dexie('nothing').open()", async () => {
      const ghost = new Dexie(stage.dbName('ghost'));
      const { error } = await tryIt(() => ghost.open());
      report(ghost, error);
      ghost.close();
    }),
  ]);
  return stage.dispose;
};

export default mount;
