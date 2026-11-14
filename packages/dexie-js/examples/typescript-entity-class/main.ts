// Rows read back as Friend objects: friend.birthday() updates the database itself
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { caption, columns, eventLog } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import AppDB from './AppDB.ts';
import Friend from './Friend.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls a method on the Friend object itself.' });
  const db = stage.own(new AppDB(stage.dbName('FriendsDB')));

  // add() takes plain objects: EntityTable makes the id optional and leaves methods out.
  await db.friends.bulkAdd([
    { name: 'Simon', age: 16 },
    { name: 'Sara', age: 63 },
    { name: 'Josephine', age: 21 },
  ]);

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 3, 2);
  // "stage" is not stored: the grid asks each Friend object for it.
  tableView(stage, left!, {
    table: db.friends,
    columns: ['name', { field: 'age', width: '2.6em' }, { field: 'stage', width: '4em', format: (_v, row) => (row as unknown as Friend).lifeStage() }],
  });
  const log = eventLog(right!, 'read back as', 6);

  const birthday = async (friend: Friend) => {
    say.set(`${friend.name}'s birthday, a method call.`, 'await friend.birthday()');
    await friend.birthday();
    const again = (await db.friends.get(friend.id))!;
    log.add(`${again instanceof Friend ? 'Friend' : 'plain object'}: ${again.name}, ${again.age} (${again.lifeStage()})`, 'ok');
  };

  say.set('Rows come back as Friend objects.', 'this.friends.mapToClass(Friend)');
  if (stage.preview) {
    let turn = 0;
    stage.play(async (wait) => {
      const all = await db.friends.toArray();
      await birthday(all[turn++ % all.length]!);
      await wait(1600);
      if (turn % 6 === 0) await db.friends.bulkPut([{ id: 1, name: 'Simon', age: 16 }, { id: 2, name: 'Sara', age: 63 }]);
    });
  } else {
    for (const friend of await db.friends.toArray()) button(stage, `${friend.name}.birthday()`, () => birthday(friend));
  }

  return stage.dispose;
};

export default mount;
