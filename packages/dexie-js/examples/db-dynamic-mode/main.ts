// Dynamic mode: open a database without version() and read its schema from the database itself
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { schemaLines, tryIt, versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'dynamic', title: 'what it found' });
  const { lab, out, stage } = d;
  d.say.set('Someone else made this database.', "new Dexie('name') with no version()");
  d.run([
    d.step('Make a database', 'Declared with version(1) the usual way.', "version(1).stores({ friends, pets })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name, age', pets: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine', age: 21 }, { name: 'Per', age: 75 }]);
      lab.show('friends', [ID, 'name', { field: 'age', width: '3.4em' }]);
      out.idle('2 tables stored');
    }),
    d.step('Open it blind', 'No version(): it adapts to what is there.', 'await new Dexie(name).open()', async () => {
      const db = await lab.open(() => {});
      out.list(schemaLines(db));
    }),
    d.step('Read a table', 'Tables are found by name.', "db.table('friends').toArray()", async () => {
      const rows = await lab.db.table('friends').toArray();
      lab.show('friends', [ID, 'name', { field: 'age', width: '3.4em' }]);
      out.list(rows.map((r) => `${r.name}, ${r.age}`));
    }),
    d.step('Open one that is not there', 'A name nobody created is an error.', "await new Dexie('nothing').open()", async () => {
      const ghost = new Dexie(stage.dbName('nothing'));
      const { error } = await tryIt(() => ghost.open());
      ghost.close();
      out.value(error?.name ?? 'opened', 'dynamic mode only opens what exists', 'bad');
    }),
  ]);
  return stage.dispose;
};

export default mount;
