// A live query that reads a setting, then queries with it: a change to either table re-runs it
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Setting {
  key: string;
  value: number;
}
interface Friend {
  id: number;
  name: string;
  age: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the setting or a friend: the list follows both.' });
  const db = stage.own(new Dexie(stage.dbName('app'))) as Dexie & {
    settings: EntityTable<Setting, 'key'>;
    friends: EntityTable<Friend, 'id'>;
  };
  db.version(1).stores({ settings: 'key', friends: '++id, name, age' });
  await db.settings.put({ key: 'minAge', value: 50 });
  await db.friends.bulkAdd([
    { name: 'Josephine', age: 21 },
    { name: 'Sara', age: 50 },
    { name: 'Per', age: 75 },
    { name: 'Arnold', age: 33 },
  ] as Friend[]);

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  tableView(stage, left!, { table: db.settings, columns: ['key', { field: 'value', width: '3em' }] });
  tableView(stage, left!, { table: db.friends, columns: ['name', { field: 'age', width: '3em' }] });
  const out = resultPanel(right!, 'age ≥ minAge');

  // Two awaited queries in one querier: both the setting and the friends it selects are watched.
  const sub = liveQuery(async () => {
    const minAge = await db.settings.get('minAge');
    return db.friends.where('age').aboveOrEqual(minAge!.value).toArray();
  }).subscribe({ next: (rows) => out.list(rows.map((f) => `${f.name} ${f.age}`)), error: stage.fail });
  stage.onDispose(() => sub.unsubscribe());

  const setMin = (value: number) => ({
    label: `minAge → ${value}`,
    run: async () => {
      say.set(`Change the setting to ${value}.`, `db.settings.put({ key: 'minAge', value: ${value} })`);
      await db.settings.put({ key: 'minAge', value });
    },
  });
  const setAge = (name: string, age: number) => ({
    label: `${name} → ${age}`,
    run: async () => {
      say.set(`${name} is now ${age}.`, `db.friends.where('name').equals('${name}').modify({ age: ${age} })`);
      await db.friends.where('name').equals(name).modify({ age });
    },
  });
  tour(stage, [setMin(30), setAge('Josephine', 31), setMin(50), setAge('Josephine', 21)]);
  say.set('The list reads a setting, then friends.', "await db.settings.get('minAge') … where('age').aboveOrEqual(min)");

  return stage.dispose;
};

export default mount;
