// db.friends exists only when the schema was declared
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const prop = (db: object, name: string): unknown => (db as Record<string, unknown>)[name];

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'tableprop', title: 'what was found' });
  const { lab, out } = d;
  const report = (what: string): void => {
    out.list([`${what}: ${prop(lab.db, 'friends') ? 'a Table' : 'undefined'}`, `db.table("friends"): ${lab.db.table('friends') ? 'a Table' : 'undefined'}`]);
  };
  d.say.set('Two ways to reach a table.', 'db.friends, db.table("friends")');
  d.run([
    d.step('Declared schema', 'Each table becomes a property.', "db.version(1).stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      report('db.friends');
    }),
    d.step('Open without a schema', 'Properties are not created now.', 'await new Dexie(name).open()', async () => {
      await lab.open(() => {});
      lab.show('friends', [ID, 'name']);
      report('db.friends');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
