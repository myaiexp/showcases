// The docs' Hello World: declare a friends table, store four friends, ask three questions
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { columns, caption, resultPanel } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Friend {
  id: number;
  name: string;
  age: number;
  notIndexedProperty?: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run the steps in order, or in any order you like.' });

  // A database with one table, "friends": primary key "id", indexes on "name" and "age".
  const db = stage.own(new Dexie(stage.dbName('FriendDatabase'))) as Dexie & {
    friends: EntityTable<Friend, 'id'>;
  };
  db.version(1).stores({
    friends: `
      id,
      name,
      age`,
  });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  const view = tableView(stage, left!, {
    table: db.friends,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
  });
  const out = resultPanel(right!);
  say.set('An empty table, declared in one line.', "db.version(1).stores({ friends: 'id, name, age' })");

  tour(
    stage,
    [
      {
        label: 'Store four friends',
        run: async () => {
          view.unmark();
          say.set('Store four friends in one call.', 'db.friends.bulkPut([...])');
          await db.friends.bulkPut([
            { id: 1, name: 'Josephine', age: 21 },
            { id: 2, name: 'Per', age: 75 },
            { id: 3, name: 'Simon', age: 5 },
            { id: 4, name: 'Sara', age: 50, notIndexedProperty: 'foo' },
          ]);
          out.idle('4 friends saved');
        },
      },
      {
        label: 'Young friends',
        run: async () => {
          say.set('Who is between 0 and 25?', "db.friends.where('age').between(0, 25).toArray()");
          const friends = await db.friends.where('age').between(0, 25).toArray();
          view.mark(friends.map((f) => f.id));
          out.list(friends.map((f) => f.name));
        },
      },
      {
        label: 'Oldest first',
        run: async () => {
          say.set('Everyone, oldest first.', "db.friends.orderBy('age').reverse().toArray()");
          const friends = await db.friends.orderBy('age').reverse().toArray();
          view.unmark();
          out.list(friends.map((f) => `${f.name} ${f.age}`));
        },
      },
      {
        label: "Names on 'S'",
        run: async () => {
          say.set('Names starting with S, as keys only.', "db.friends.where('name').startsWith('S').keys()");
          const names = await db.friends.where('name').startsWith('S').keys();
          view.mark((f) => names.includes(f.name as string));
          out.list(names);
        },
      },
    ],
    {
      reset: async () => {
        view.unmark();
        out.clear();
        say.set('Clear the table and start over.', 'db.friends.clear()');
        await db.friends.clear();
        await stage.wait(1400);
      },
    },
  );

  return stage.dispose;
};

export default mount;
