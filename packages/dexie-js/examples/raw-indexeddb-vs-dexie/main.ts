// The same job twice: raw IndexedDB beside Dexie, with the size of the code each needed
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tour } from '../../shared/tour.ts';
import { rawFindAdults, type Friend } from './raw.ts';
import rawSource from './raw.ts?raw';
import ownSource from './main.ts?raw';

const FRIENDS: Friend[] = [
  { name: 'Josephine', age: 21 },
  { name: 'Per', age: 75 },
  { name: 'Simon', age: 5 },
  { name: 'Sara', age: 50 },
];

async function dexieFindAdults(db: Dexie & { friends: EntityTable<Friend & { id: number }, 'id'> }) {
  await db.friends.bulkAdd(FRIENDS);
  return db.friends.where('age').between(20, 60, true, true).toArray();
}

/** Lines of a function as written in its source file (the built bundle is minified). */
function lines(source: string, name: string): number {
  const all = source.split('\n');
  const start = all.findIndex((l) => l.includes(`function ${name}(`));
  return all.slice(start).findIndex((l) => l === '}') + 1;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  const raw = resultPanel(left!, 'raw IndexedDB');
  const dex = resultPanel(right!, 'Dexie');

  const rawName = stage.dbName('raw');
  const deleteRaw = () =>
    new Promise<void>((resolve) => {
      const req = indexedDB.deleteDatabase(rawName);
      req.onsuccess = req.onerror = () => resolve();
    });
  stage.onDispose(() => void deleteRaw());
  const db = stage.own(new Dexie(stage.dbName('dexie'))) as Dexie & {
    friends: EntityTable<Friend & { id: number }, 'id'>;
  };
  db.version(1).stores({ friends: '++id, age' });

  tour(stage, [
    {
      label: 'Run both',
      run: async () => {
        say.set('Store 4 friends, find those aged 20–60.', "where('age').between(20, 60, true, true)");
        raw.idle('running…');
        dex.idle('running…');
        // Start each run from empty databases, so it is the same job every time.
        await deleteRaw();
        await db.delete({ disableAutoOpen: false });

        const names = await rawFindAdults(rawName, FRIENDS);
        raw.value(`${lines(rawSource, 'rawFindAdults')} lines`, `found ${names.join(', ')}`, 'warn');
        const friends = await dexieFindAdults(db);
        dex.value(`${lines(ownSource, 'dexieFindAdults')} lines`, `found ${friends.map((f) => f.name).join(', ')}`);
      },
      hold: 4000,
    },
  ]);
  say.set('One task, two ways to write it.', 'Press Run both');

  return stage.dispose;
};

export default mount;
