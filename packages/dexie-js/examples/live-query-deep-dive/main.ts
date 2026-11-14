// The liveQuery deep dive: five changes to one friend, and what the subscriber receives
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns, eventLog } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Friend {
  id: number;
  name: string;
  age: number;
  foo?: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run the five steps in order; watch what the subscriber is sent.' });
  const db = stage.own(new Dexie(stage.dbName('FriendDatabase'))) as Dexie & { friends: EntityTable<Friend, 'id'> };
  db.version(1).stores({ friends: '++id, name, age' });

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  const view = tableView(stage, left!, {
    table: db.friends,
    columns: [{ field: 'name' }, { field: 'age', width: '3em' }, ...(stage.preview ? [] : [{ field: 'foo', width: '3em' }])],
  });
  const log = eventLog(right!, 'subscriber got', 12);

  // The live query: friends aged 50 up to 75. Every result it emits lands in the log.
  const friendsObservable = liveQuery(() => db.friends.where('age').between(50, 75).toArray());
  const subscription = friendsObservable.subscribe({
    next: (result) => {
      log.add(`[${result.map((f) => `${f.name} ${f.age}${f.foo ? ` ${f.foo}` : ''}`).join(', ')}]`, result.length ? 'ok' : 'muted');
      view.mark(result.map((f) => f.id));
    },
    error: (error) => log.add(String(error), 'bad'),
  });
  stage.onDispose(() => subscription.unsubscribe());

  let friendId = 0;
  tour(
    stage,
    [
      {
        label: '1. Add Magdalena, 54',
        run: async () => {
          say.set('1. Add Magdalena, 54: she is in range.', "db.friends.add({ name: 'Magdalena', age: 54 })");
          friendId = await db.friends.add({ name: 'Magdalena', age: 54 } as Friend);
        },
      },
      {
        label: '2. Age to 99',
        run: async () => {
          say.set('2. Age 99: she drops out of range.', 'db.friends.update(friendId, { age: 99 })');
          await db.friends.update(friendId, { age: 99 });
        },
      },
      {
        label: '3. Age to 55',
        run: async () => {
          say.set('3. Age 55: back in.', 'db.friends.update(friendId, { age: 55 })');
          await db.friends.update(friendId, { age: 55 });
        },
      },
      {
        label: "4. foo = 'bar'",
        run: async () => {
          say.set('4. A property of a result changes.', "db.friends.update(friendId, { foo: 'bar' })");
          await db.friends.update(friendId, { foo: 'bar' });
        },
      },
      {
        label: '5. Delete her',
        run: async () => {
          say.set('5. Delete her: the result is empty again.', 'db.friends.delete(friendId)');
          await db.friends.delete(friendId);
        },
        hold: 2400,
      },
    ],
    { reset: () => log.add('— again —', 'muted') },
  );
  say.set('Subscribed to friends aged 50 to 75.', "liveQuery(() => db.friends.where('age').between(50, 75).toArray())");

  return stage.dispose;
};

export default mount;
