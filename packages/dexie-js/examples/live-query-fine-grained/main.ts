// Two live queries over one table: a change wakes only the query whose answer it touches
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Friend {
  id: number;
  name: string;
  age: number;
}

const START = [
  { name: 'Simon', age: 5 },
  { name: 'Bertil', age: 12 },
  { name: 'Sara', age: 40 },
  { name: 'Per', age: 75 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each change touches one age group. Watch which counter moves.' });
  const db = stage.own(new Dexie(stage.dbName('friends'))) as Dexie & { friends: EntityTable<Friend, 'id'> };
  db.version(1).stores({ friends: '++id, name, age' });

  const say = caption(stage.root);
  const [left, mid, right] = columns(stage.root, 5, 3, 3);
  tableView(stage, left!, { table: db.friends, columns: ['name', { field: 'age', width: '3em' }] });

  // One panel per live query; its heading counts how many times the query ran.
  const watch = (parent: HTMLElement, label: string, query: () => Promise<Friend[]>) => {
    const panel = resultPanel(parent, label);
    const head = panel.el.firstElementChild as HTMLElement;
    let runs = 0;
    const sub = liveQuery(query).subscribe({
      next: (rows) => {
        runs++;
        head.textContent = `${label} · ran ${runs}×`;
        panel.list(rows.map((f) => `${f.name} ${f.age}`));
        panel.el.animate([{ borderColor: 'var(--accent)' }, { borderColor: 'var(--border)' }], { duration: 900 });
      },
      error: stage.fail,
    });
    stage.onDispose(() => sub.unsubscribe());
  };
  const reset = async () => {
    await db.friends.clear();
    await db.friends.bulkAdd(START as Friend[]);
  };
  // Seed before subscribing, so each counter starts at its first run.
  await reset();
  watch(mid!, 'under 18', () => db.friends.where('age').below(18).toArray());
  watch(right!, '65+', () => db.friends.where('age').aboveOrEqual(65).toArray());

  tour(
    stage,
    [
      {
        label: 'Add Elna, 99',
        run: async () => {
          say.set('Add Elna, 99: only "65+" re-runs.', "db.friends.add({ name: 'Elna', age: 99 })");
          await db.friends.add({ name: 'Elna', age: 99 } as Friend);
        },
      },
      {
        label: 'Bertil turns 13',
        run: async () => {
          say.set('Bertil turns 13: only "under 18".', "db.friends.where('name').equals('Bertil').modify({ age: 13 })");
          await db.friends.where('name').equals('Bertil').modify({ age: 13 });
        },
      },
      {
        label: 'Sara turns 41',
        run: async () => {
          say.set('Sara, 41, is in neither: no re-run.', "db.friends.where('name').equals('Sara').modify({ age: 41 })");
          await db.friends.where('name').equals('Sara').modify({ age: 41 });
        },
      },
    ],
    {
      reset: async () => {
        say.set('Start over (both queries re-run).', 'clear() + bulkAdd()');
        await reset();
        await stage.wait(1500);
      },
    },
  );
  say.set('Two live queries share one table.', "liveQuery(() => db.friends.where('age').below(18).toArray())");

  return stage.dispose;
};

export default mount;
