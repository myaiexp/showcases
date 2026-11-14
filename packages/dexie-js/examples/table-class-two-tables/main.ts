// Each table in stores() shows up as a property of db: db.friends, db.pets
import Dexie, { type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Friend { id: number; name: string; isCloseFriend: number }
interface Pet { id: number; name: string; kind: string; fur?: string }

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each table is its own list, reached as db.<name>.' });
  const db = stage.own(new Dexie(stage.dbName('friendsandpets'))) as Dexie & {
    friends: EntityTable<Friend, 'id'>;
    pets: EntityTable<Pet, 'id'>;
  };
  db.version(1).stores({ friends: '++id, name, isCloseFriend', pets: '++id, name, kind' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  const id = { field: 'id', width: '2.2em' };
  tableView(stage, left!, { table: db.friends, columns: stage.preview ? [id, 'name'] : [id, 'name', { field: 'isCloseFriend', label: 'close', width: '3.4em' }] });
  tableView(stage, right!, { table: db.pets, columns: stage.preview ? [id, 'name'] : [id, 'name', 'kind', 'fur'] });
  say.set('Two tables, two properties of db.', "stores({ friends: ..., pets: ... })");

  tour(
    stage,
    [
      {
        label: 'Add a friend',
        run: async () => {
          say.set('db.friends is the friends table.', "db.friends.add({ name: 'Ingemar' })");
          await db.friends.add({ name: 'Ingemar Bergman', isCloseFriend: 0 } as Friend);
        },
      },
      {
        label: 'Add a pet',
        run: async () => {
          say.set('db.pets is a different table.', "db.pets.add({ name: 'Josephina', ... })");
          await db.pets.add({ name: 'Josephina', kind: 'dog', fur: 'too long right now' } as Pet);
        },
      },
      {
        label: 'Add more',
        run: async () => {
          say.set('They never mix: each has its own ids.', 'db.friends.add(...), db.pets.add(...)');
          await db.friends.add({ name: 'Per', isCloseFriend: 1 } as Friend);
          await stage.wait(500);
          await db.pets.add({ name: 'Tom', kind: 'cat' } as Pet);
        },
      },
    ],
    {
      reset: async () => {
        say.set('Clear both tables.', 'db.friends.clear(), db.pets.clear()');
        await Promise.all([db.friends.clear(), db.pets.clear()]);
        await stage.wait(1200);
      },
    },
  );

  return stage.dispose;
};

export default mount;
