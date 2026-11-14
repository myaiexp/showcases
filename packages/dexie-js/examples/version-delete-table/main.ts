// A table is only deleted when a version says null; leaving it out keeps it
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };
const names = (tables: { name: string }[]): string[] => tables.map((t) => t.name);

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'deltable', title: 'tables present' });
  const { lab, out } = d;
  const v1 = { friends: '++id, name', pets: '++id, name' };
  d.say.set('Version 1 has two tables.', "stores({ friends: ..., pets: ... })");
  d.run([
    d.step('Install version 1', 'friends and pets.', "version(1).stores({ friends, pets })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores(v1));
      lab.show('pets', [ID, 'name']);
      await db.table('pets').bulkAdd([{ name: 'Tom' }, { name: 'Rex' }]);
      out.list(names(db.tables));
    }),
    d.step('Version 2 leaves pets out', 'Not mentioned is not deleted.', "version(2).stores({ friends: '++id, name' })", async () => {
      const db = await lab.open((x) => {
        x.version(1).stores(v1);
        x.version(2).stores({ friends: '++id, name' });
      });
      lab.show('pets', [ID, 'name']);
      out.list(names(db.tables));
    }),
    d.step('Version 3 says null', 'null means: delete this table.', "version(3).stores({ pets: null })", async () => {
      const db = await lab.open((x) => {
        x.version(1).stores(v1);
        x.version(2).stores({ friends: '++id, name' });
        x.version(3).stores({ pets: null });
      });
      lab.show('friends', [ID, 'name']);
      out.list(names(db.tables));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
