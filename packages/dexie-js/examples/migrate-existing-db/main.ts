// A database made without Dexie opens in dynamic mode, and its schema comes out as Dexie code
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

/** Builds a database with the plain browser API, at its version 2, as an old app might have. */
function buildRaw(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, 2);
    req.onupgradeneeded = () => {
      const idb = req.result;
      const tasks = idb.createObjectStore('tasks', { keyPath: 'id' });
      tasks.createIndex('description', 'description');
      tasks.createIndex('done', 'done');
      idb.createObjectStore('notes', { keyPath: 'id', autoIncrement: true }).createIndex('taskId', 'taskId');
      tasks.put({ id: 1, description: 'Water the plants', done: 1 });
      tasks.put({ id: 2, description: 'Call Per', done: 0 });
    };
    req.onsuccess = () => {
      req.result.close();
      resolve();
    };
    req.onerror = () => reject(req.error);
  });
}

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'migrate', title: 'dumped schema', height: 380 });
  const { lab, out } = d;
  d.say.set('An old app stored tasks without Dexie.', 'indexedDB.open(name, 2)');
  d.run([
    d.step('An existing database', 'Made with the browser API only.', 'indexedDB.open(name, 2)', async () => {
      await lab.wipe();
      await buildRaw(lab.name);
      out.idle('2 tables, no Dexie involved');
    }),
    d.step('Open it with Dexie', 'No version() needed to read it.', 'await new Dexie(name).open()', async () => {
      const db = await lab.open(() => {});
      lab.show('tasks', [ID, 'description', { field: 'done', width: '3em' }]);
      out.list(db.tables.map((t) => t.name));
    }),
    d.step('The code to paste', 'Dexie prints the schema as code.', 'db.verno, table.schema.primKey.src', async () => {
      const db = lab.db;
      const lines = db.tables.map((t) => `${t.name}: '${[t.schema.primKey.src, ...t.schema.indexes.map((i) => i.src)].join(',')}'`);
      out.list([`db.version(${db.verno}).stores({`, ...lines.map((l) => `  ${l}`), '})']);
    }),
    d.step('Query it', 'From here it is an ordinary Dexie table.', "where('done').equals(0)", async () => {
      const rows = await lab.db.table('tasks').where('done').equals(0).toArray();
      out.list(rows.map((r) => r.description));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
