// add([...]) on an array property: new tags join, duplicates don't, the list stays sorted
import Dexie, { add, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { textField } from '../../shared/controls.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Thing {
  id: string;
  tags?: string[];
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Or type tags (comma separated) and press Enter to add them to the guitar.' });
  const db = stage.own(new Dexie(stage.dbName('things'))) as Dexie & { things: EntityTable<Thing, 'id'> };
  db.version(1).stores({ things: 'id' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.things,
    columns: [{ field: 'id', width: '5em' }, 'tags'],
  });

  function addTags(thing: Pick<Thing, 'id'>, ...tagsToAdd: string[]) {
    return db.things.update(thing.id, {
      tags: add([...tagsToAdd]),
    });
  }

  const step = (id: string, tags: string[], say1: string) => ({
    label: `${id}: + ${tags.join(', ')}`,
    run: async () => {
      view.mark([id]);
      say.set(say1, `update('${id}', { tags: add(${JSON.stringify(tags)}) })`);
      await addTags({ id }, ...tags);
    },
  });

  tour(
    stage,
    [
      step('guitar', ['wood', 'loud'], 'Two new tags join, sorted A to Z.'),
      step('guitar', ['music', 'wood'], 'Tags it already has are not added twice.'),
      step('kettle', ['kitchen'], 'No tags yet? The list is created.'),
    ],
    {
      setup: () =>
        db.things.bulkPut([
          { id: 'guitar', tags: ['music', 'strings'] },
          { id: 'kettle' },
        ]),
      reset: async () => {
        view.unmark();
        say.set('Put the starting tags back.', 'db.things.bulkPut([...])');
        await db.things.bulkPut([{ id: 'guitar', tags: ['music', 'strings'] }, { id: 'kettle' }]);
        await stage.wait(1200);
      },
    },
  );
  say.set('Tag lists that only ever gain unique tags.', "db.things.update(id, { tags: add(['…']) })");

  if (!stage.preview) {
    const input = textField(stage, 'Tags', 'blue, music', async (text) => {
      const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
      view.mark(['guitar']);
      say.set('Add your tags to the guitar.', `update('guitar', { tags: add(${JSON.stringify(tags)}) })`);
      await addTags({ id: 'guitar' }, ...tags);
      input.select();
    }, 160);
  }

  return stage.dispose;
};

export default mount;
