// remove([...]) on an array property takes out the listed items that are there
import Dexie, { remove, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { textField } from '../../shared/controls.ts';
import { caption } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Thing {
  id: string;
  tags?: string[] | string;
}

const START: Thing[] = [
  { id: 'guitar', tags: ['loud', 'music', 'strings', 'wood'] },
  { id: 'kettle', tags: 'kitchen' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Or type tags (comma separated) and press Enter to take them off the guitar.' });
  const db = stage.own(new Dexie(stage.dbName('things'))) as Dexie & { things: EntityTable<Thing, 'id'> };
  db.version(1).stores({ things: 'id' });

  const say = caption(stage.root);
  const view = tableView(stage, stage.root, {
    table: db.things,
    columns: [{ field: 'id', width: '5em' }, 'tags'],
  });

  function removeTags(thing: Pick<Thing, 'id'>, ...tagsToRemove: string[]) {
    return db.things.update(thing.id, {
      tags: remove([...tagsToRemove]),
    });
  }

  const step = (id: string, tags: string[], text: string) => ({
    label: `${id}: − ${tags.join(', ')}`,
    run: async () => {
      view.mark([id]);
      say.set(text, `update('${id}', { tags: remove(${JSON.stringify(tags)}) })`);
      await removeTags({ id }, ...tags);
    },
  });

  tour(
    stage,
    [
      step('guitar', ['loud'], 'Take one tag off.'),
      step('guitar', ['wood', 'drums'], 'Missing tags are simply skipped.'),
      step('kettle', ['kitchen'], 'Not a list? It becomes an empty one.'),
    ],
    {
      setup: () => db.things.bulkPut(START),
      reset: async () => {
        view.unmark();
        say.set('Put the starting tags back.', 'db.things.bulkPut([...])');
        await db.things.bulkPut(START);
        await stage.wait(1200);
      },
    },
  );
  say.set('Take tags off a stored list.', "db.things.update(id, { tags: remove(['…']) })");

  if (!stage.preview) {
    const input = textField(stage, 'Tags', 'music', async (text) => {
      const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
      view.mark(['guitar']);
      say.set('Take your tags off the guitar.', `update('guitar', { tags: remove(${JSON.stringify(tags)}) })`);
      await removeTags({ id: 'guitar' }, ...tags);
      input.select();
    }, 160);
  }

  return stage.dispose;
};

export default mount;
