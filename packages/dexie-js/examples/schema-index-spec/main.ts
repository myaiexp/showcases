// IndexSpec: every index in table.schema says whether it is unique, multi-entry or compound
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

interface Spec {
  name: string;
  src: string;
  unique?: boolean;
  multi?: boolean;
  compound?: boolean;
  auto?: boolean;
}

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, {
    stores: '++id, &email, *tags, [first+last]',
    seed: [
      { id: 1, email: 'jo@x.se', tags: ['pets'], first: 'Jo', last: 'Berg' },
      { id: 2, email: 'per@x.se', tags: ['cars', 'pets'], first: 'Per', last: 'Ek' },
    ],
    columns: ctx.preview ? [ID_COL, 'email', 'tags'] : [ID_COL, 'email', 'tags', 'first', 'last'],
  });
  const { stage, t, say, out } = d;
  const specs = (): Spec[] => t.schema.indexes as Spec[];
  say.set('Four kinds of index, one table.', "stores({ friends: '++id, &email, *tags, [first+last]' })");
  d.run([
    d.step('Primary key', 'auto is true for ++id.', 'db.friends.schema.primKey', async () => {
      const p = t.schema.primKey as Spec;
      out.list([`name: ${p.name}`, `src: ${p.src}`, `auto: ${p.auto}`]);
    }),
    d.step('Each index: src', 'src is the index as you wrote it.', 'schema.indexes.map(i => i.src)', async () => {
      out.list(specs().map((i) => i.src));
    }),
    d.step('Which are special?', 'Flags tell the kinds apart.', 'indexes.filter(i => i.unique)', async () => {
      out.list(specs().filter((i) => i.unique || i.multi || i.compound).map((i) => `${i.name}: ${[i.unique && 'unique', i.multi && 'multi', i.compound && 'compound'].filter(Boolean).join(' ')}`));
    }),
  ]);
  return stage.dispose;
};

export default mount;
