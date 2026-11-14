// Table.schema: the primary key and indexes a table was declared with
import type { Mount } from '@/types.ts';
import { demo, friends, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
  stores: '++id, name, &email, *tags',
  seed: [
    { id: 1, name: 'Josephine', email: 'jo@x.se', tags: ['sports', 'pets'] },
    { id: 2, name: 'Per', email: 'per@x.se', tags: ['cars'] },
    { id: 3, name: 'Simon', email: 'si@x.se', tags: [] },
  ],
  columns: ctx.preview ? [ID_COL, 'name', 'email'] : [ID_COL, 'name', 'email', 'tags'],
});
  const { stage, db, t, say, view, out } = d;
  const s = t.schema;
  say.set('Declared: ++id, name, &email, *tags');
  d.run([
    d.step('Primary key', 'The primary key, auto-numbered.', 'db.friends.schema.primKey.keyPath', async () => {
      out.value(String(s.primKey.keyPath), s.primKey.auto ? 'auto-incremented' : 'not auto-incremented');
    }),
    d.step('Indexes', 'Every other searchable field.', 'db.friends.schema.indexes', async () => {
      out.list(s.indexes.map((i: { src: string }) => i.src));
    }),
    d.step('Unique ones', 'Marked & : no two rows may match.', 'indexes.filter(i => i.unique)', async () => {
      out.list(s.indexes.filter((i: { unique?: boolean }) => i.unique).map((i: { name: string }) => i.name));
    }),
    d.step('Multi-entry', 'Marked * : one entry per array item.', 'indexes.filter(i => i.multi)', async () => {
      out.list(s.indexes.filter((i: { multi?: boolean }) => i.multi).map((i: { name: string }) => i.name));
    }),
  ]);

  return stage.dispose;
};

export default mount;
