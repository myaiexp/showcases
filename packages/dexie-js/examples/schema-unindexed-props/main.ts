// Only the fields you list are indexed; every other field is still stored, just not searchable
import type { Mount } from '@/types.ts';
import { attempt, demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, name',
    label: 'pets',
    table: 'pets',
    seed: [
      { id: 1, name: 'Josephina', kind: 'dog', fur: 'too long' },
      { id: 2, name: 'Tom', kind: 'cat', fur: 'short' },
    ],
    columns: ctx.preview ? ['name', 'kind', 'fur'] : [ID_COL, 'name', 'kind', 'fur'],
  });
  const { stage, t, say, view, out } = d;
  say.set('Only name is declared. kind and fur are not.', "stores({ pets: '++id, name' })");
  d.run([
    d.step('Store extra fields', 'kind and fur are stored all the same.', "put({ name: 'Rex', kind: 'dog', fur: 'curly' })", async () => {
      await t.put({ name: 'Rex', kind: 'dog', fur: 'curly' });
      out.idle('stored with all fields');
    }),
    d.step('Search by name', 'name is indexed: where() works.', "where('name').equals('Tom')", async () => {
      const rows = await t.where('name').equals('Tom').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }),
    d.step('Search by fur', 'fur is not indexed: where() refuses.', "where('fur').equals('short')", async () => {
      const { error } = await attempt(Promise.resolve().then(() => t.where('fur').equals('short').toArray()));
      out.value(error?.name ?? 'found', error?.message.slice(0, 60), 'bad');
    }),
  ]);
  return stage.dispose;
};

export default mount;
