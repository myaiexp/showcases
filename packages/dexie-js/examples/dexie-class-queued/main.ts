// A Dexie instance can be used right away: calls made before it is open wait their turn
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'queued', title: 'what happened' });
  const { lab, out } = d;
  d.say.set('Declared, but never opened.', "new Dexie('MyDatabase')");
  d.run([
    d.step('Declare, do not open', 'No open() call anywhere.', "db.version(1).stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = lab.next((x) => x.version(1).stores({ friends: '++id, name' }));
      out.value(db.isOpen(), 'db.isOpen()', 'warn');
    }),
    d.step('Use it anyway', 'Three calls wait, then run in order.', 'db.friends.add(...) x2, then toArray()', async () => {
      const db = lab.db;
      const t = db.table('friends');
      const lines = [`calls sent, isOpen: ${db.isOpen()}`];
      out.list(lines, 'warn');
      const adds = Promise.all([t.add({ name: 'Josephine' }), t.add({ name: 'Per' })]);
      const all = t.toArray();
      await adds;
      lab.show('friends', [ID, 'name']);
      lines.push(`done, isOpen: ${db.isOpen()}`, `toArray(): ${(await all).length} rows`);
      out.list(lines);
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
