// db.verno: the highest version declared (or found), and the number IndexedDB itself stores
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'verno', title: 'returned' });
  const { lab, out } = d;
  d.say.set('Two versions declared: 1 and 3.', 'version(1).stores(...), version(3).stores(...)');
  d.run([
    d.step('Declare 1 and 3', 'verno is the highest one declared.', 'db.verno', async () => {
      await lab.wipe();
      const db = await lab.open((x) => {
        x.version(1).stores({ friends: '++id, name' });
        x.version(3).stores({ friends: '++id, name, age' });
      });
      lab.show('friends', [ID, 'name']);
      out.value(db.verno, 'db.verno');
    }),
    d.step('The number IndexedDB stores', 'Dexie multiplies your number by 10.', 'db.backendDB().version', async () => {
      out.value(lab.db.backendDB().version, 'native version: 3 x 10');
    }),
    d.step('Open without version()', 'Dynamic mode reads the number back.', 'await new Dexie(name).open()', async () => {
      const db = await lab.open(() => {});
      out.value(db.verno, 'db.verno, read from the database');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
