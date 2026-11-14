// Dexie.addons: an addon decorates new databases; addons: [] opts out
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

type WithForEach = { Collection: { prototype: { forEach?: unknown } } };

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { log: true, hint: 'The addon is registered for one instant, then taken off the page-wide list.' });
  const { stage, log } = d;
  const dbs: Dexie[] = [];
  const ForEachAddon = (db: Dexie): void => {
    // Makes it possible to use forEach() instead of each() on collections.
    const proto = (db as unknown as { Collection: { prototype: Record<string, unknown> } }).Collection.prototype;
    proto.forEach = proto.each;
  };
  // Dexie.addons is shared by the whole page: register, build, unregister, all in one synchronous run.
  const build = (label: string, options?: { addons: [] }): Dexie => {
    Dexie.addons.push(ForEachAddon);
    try {
      const db = stage.own(new Dexie(stage.dbName(label), options));
      db.version(1).stores({ friends: '++id, name' });
      dbs.push(db);
      return db;
    } finally {
      Dexie.addons.splice(Dexie.addons.indexOf(ForEachAddon), 1);
    }
  };
  stage.onDispose(() => {
    const at = Dexie.addons.indexOf(ForEachAddon);
    if (at >= 0) Dexie.addons.splice(at, 1);
  });
  const has = (db: Dexie): string => (typeof (db as unknown as WithForEach).Collection.prototype.forEach === 'function' ? 'a function' : 'undefined');
  let withAddon: Dexie | null = null;
  d.say.set('Plug a feature into every database.', 'Dexie.addons.push(ForEachAddon)');
  d.run(
    [
      d.step('Default: addon on', 'The new database gets forEach.', 'new Dexie(name)', () => {
        withAddon = build('addon-on');
        log.add(`collection.forEach: ${has(withAddon)}`, 'ok');
      }),
      d.step('Opt out', 'addons: [] skips it.', 'new Dexie(name, { addons: [] })', () => {
        const plain = build('addon-off', { addons: [] });
        log.add(`collection.forEach: ${has(plain)}`, 'bad');
      }),
      d.step('Use it', 'forEach works like each.', "db.friends.toCollection().forEach(f => ...)", async () => {
        const db = withAddon;
        if (!db) throw new Error('Run "Default: addon on" first.');
        await db.table('friends').bulkAdd([{ name: 'Josephine' }, { name: 'Per' }]);
        const names: string[] = [];
        const coll = db.table('friends').toCollection() as unknown as { forEach(fn: (f: { name: string }) => void): Promise<void> };
        await coll.forEach((f) => void names.push(f.name));
        log.add(`forEach saw: ${names.join(', ')}`, 'ok');
      }),
    ],
    async () => {
      withAddon = null;
      await Promise.all(dbs.splice(0).map((db) => db.delete()));
    },
  );
  return stage.dispose;
};

export default mount;
