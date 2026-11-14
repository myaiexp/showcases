// "*tags": each array item becomes its own index entry; without the star the array is one key
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const ROWS = [
  { id: 1, name: 'Josephine', tags: ['sports', 'pets'] },
  { id: 2, name: 'Per', tags: ['cars'] },
  { id: 3, name: 'Arnold', tags: ['sports', 'cars'] },
];

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: 'id, name, *tags',
    extra: { plain: 'id, name, tags' },
    seed: ROWS,
    columns: ctx.preview ? ['name', 'tags'] : [ID_COL, 'name', 'tags'],
  });
  const { stage, db, t, say, view, out } = d;
  say.set('Each person has a list of tags.', "stores({ friends: 'id, name, *tags' })");
  d.run([
    d.step('Find "sports"', '* finds a row by any one tag.', "where('tags').equals('sports')", async () => {
      const rows = await t.where('tags').equals('sports').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
    d.step('Find "cars"', 'Per has one tag, Arnold has two.', "where('tags').equals('cars')", async () => {
      const rows = await t.where('tags').equals('cars').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
    d.step('Same without *', 'A plain index sees the list as one key.', "stores({ plain: 'id, name, tags' })", async () => {
      const plain = db.table('plain');
      await plain.bulkPut(ROWS);
      const rows = await plain.where('tags').equals('sports').toArray();
      out.list(rows.map((r) => r.name), 'bad');
    }),
  ]);
  return stage.dispose;
};

export default mount;
