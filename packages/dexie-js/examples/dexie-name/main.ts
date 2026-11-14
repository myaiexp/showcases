// db.name: two Dexie instances with the same name read the same stored rows
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'name', title: 'what happened' });
  const { lab, out, stage } = d;
  let other: Dexie | null = null;
  stage.onDispose(() => other?.close());
  d.say.set('One name, one database.', 'new Dexie(name)');
  d.run([
    d.step('First instance', 'It stores two friends under its name.', 'db.name', async () => {
      other?.close();
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
      lab.show('friends', [ID, 'name']);
      out.value(db.name.replace(/^showcase-dexie-/, ''), 'db.name');
    }),
    d.step('A second instance', 'Same name, so the same rows.', 'await new Dexie(db.name).open()', async () => {
      other = await new Dexie(lab.db.name).open();
      const rows = await other.table('friends').toArray();
      out.list(rows.map((r) => `${r.name}, read by instance 2`));
    }),
  ]);
  return stage.dispose;
};

export default mount;
