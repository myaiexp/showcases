// A live SHA-1 fingerprint of the table: the querier awaits Web Crypto through Dexie.waitFor()
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';
import './style.css';

interface Friend {
  id: number;
  name: string;
  age: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change something, then change it back: the fingerprint comes back too.' });
  const db = stage.own(new Dexie(stage.dbName('friends'))) as Dexie & { friends: EntityTable<Friend, 'id'> };
  db.version(1).stores({ friends: '++id, name, age' });
  await db.friends.bulkAdd([
    { name: 'Josephine', age: 21 },
    { name: 'Per', age: 75 },
    { name: 'Sara', age: 50 },
  ] as Friend[]);

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  tableView(stage, left!, { table: db.friends, columns: ['name', { field: 'age', width: '3em' }] });
  const print = document.createElement('div');
  print.className = 'print';
  const hex = document.createElement('code');
  hex.className = 'hex';
  right!.append(print, hex);

  // The docs' sample: a non-Dexie async call inside the querier goes through Dexie.waitFor().
  const friendHashObservable = liveQuery(async () => {
    const friends = await db.friends.toArray();
    const byteArray = new TextEncoder().encode(JSON.stringify(friends));
    const digestBytes = await Dexie.waitFor(crypto.subtle.digest('SHA-1', byteArray));
    return digestBytes;
  });
  const sub = friendHashObservable.subscribe({
    next: (digest) => {
      const bytes = [...new Uint8Array(digest)];
      // Each of the first 12 bytes becomes one coloured tile; equal content, equal picture.
      print.replaceChildren(
        ...bytes.slice(0, 12).map((b) => {
          const tile = document.createElement('i');
          tile.style.background = `hsl(${(b * 360) / 256} 65% ${35 + (b % 4) * 10}%)`;
          return tile;
        }),
      );
      hex.textContent = bytes.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
      print.animate([{ transform: 'scale(0.92)' }, { transform: 'none' }], { duration: 300 });
    },
    error: stage.fail,
  });
  stage.onDispose(() => sub.unsubscribe());

  const setPer = (age: number, text: string) => ({
    label: `Per's age → ${age}`,
    run: async () => {
      say.set(text, `db.friends.where('name').equals('Per').modify({ age: ${age} })`);
      await db.friends.where('name').equals('Per').modify({ age });
    },
    hold: 2200,
  });
  tour(stage, [setPer(76, 'Per turns 76: a new fingerprint.'), setPer(75, 'Back to 75: the old fingerprint returns.')]);
  say.set('A live fingerprint of everything stored.', "Dexie.waitFor(crypto.subtle.digest('SHA-1', bytes))");

  return stage.dispose;
};

export default mount;
