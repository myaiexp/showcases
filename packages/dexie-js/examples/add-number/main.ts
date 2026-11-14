// update() with add(1): each friend's age goes up by one without reading it first
import Dexie, { add, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';

interface Friend {
  id: number;
  name: string;
  age?: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Give someone a birthday. Ulf has no age yet.' });
  const db = stage.own(new Dexie(stage.dbName('friends'))) as Dexie & { friends: EntityTable<Friend, 'id'> };
  db.version(1).stores({ friends: '++id, name' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.friends,
    columns: [{ field: 'id', width: '2.6em' }, 'name', { field: 'age', width: '3.4em' }],
  });

  // Ulf has no age at all: add() starts from nothing and sets it to the argument.
  await db.friends.bulkAdd([
    { name: 'Josephine', age: 21 },
    { name: 'Per', age: 75 },
    { name: 'Simon', age: 5 },
    { name: 'Ulf' },
  ] as Friend[]);
  say.set('Birthdays: add one year, no read needed.', 'db.friends.update(id, { age: add(1) })');

  function birthday(friend: Friend) {
    return db.friends.update(friend.id, {
      age: add(1),
    });
  }

  if (stage.preview) {
    let turn = 0;
    stage.play(async (wait) => {
      const all = await db.friends.toArray();
      const friend = all[turn++ % all.length]!;
      view.mark([friend.id]);
      say.set(`Happy birthday, ${friend.name}!`, `db.friends.update(${friend.id}, { age: add(1) })`);
      await birthday(friend);
      await wait(1500);
    });
  } else {
    for (const friend of await db.friends.toArray()) {
      button(stage, `${friend.name} 🎂`, async () => {
        view.mark([friend.id]);
        say.set(`Happy birthday, ${friend.name}!`, `db.friends.update(${friend.id}, { age: add(1) })`);
        await birthday(friend);
      });
    }
  }

  return stage.dispose;
};

export default mount;
