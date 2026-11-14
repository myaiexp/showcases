// Ten likes at the same moment: read-then-put loses most of them, add(1) counts every one
import Dexie, { add, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Counter {
  id: string;
  likes: number;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both rows receive the same number of likes, all at once.' });
  const db = stage.own(new Dexie(stage.dbName('likes'))) as Dexie & { counters: EntityTable<Counter, 'id'> };
  db.version(1).stores({ counters: 'id' });

  const say = caption(stage.root);
  tableView(stage, stage.root, {
    table: db.counters,
    columns: [{ field: 'id', label: 'counted with' }, { field: 'likes', width: '4em' }],
  });

  // The usual way: read the row, add one in JavaScript, write it back.
  async function likeByReading() {
    const row = await db.counters.get('get + put');
    await db.counters.put({ id: 'get + put', likes: row!.likes + 1 });
  }
  // add(1) does the addition inside the database's own update.
  function likeWithAdd() {
    return db.counters.update('add(1)', { likes: add(1) });
  }

  let people = 10;
  const reset = () => db.counters.bulkPut([{ id: 'get + put', likes: 0 }, { id: 'add(1)', likes: 0 }]);

  tour(
    stage,
    [
      {
        label: 'Like it, all at once',
        run: async () => {
          say.set(`${people} people press Like at the same moment.`, 'Promise.all([...likes])');
          const likes = Array.from({ length: people }, () => [likeByReading(), likeWithAdd()]).flat();
          await Promise.all(likes);
        },
        hold: 3200,
      },
      {
        label: 'Reset to 0',
        run: async () => {
          say.set('Back to zero.', 'db.counters.bulkPut([...])');
          await reset();
        },
        hold: 1200,
      },
    ],
    { setup: reset },
  );
  say.set('Every read-then-put saw the same old count.', "update('add(1)', { likes: add(1) })");

  if (!stage.preview) slider(stage, 'People', 2, 50, people, (v) => (people = v));

  return stage.dispose;
};

export default mount;
