// d2 example: A label different from the key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A label different from the key',
  summary:
    'By default a shape\'s label is its key. `pg: PostgreSQL` keeps the short key `pg` for later references and shows `PostgreSQL` on the shape.',
  section: 'Shapes',
  tags: ['label', 'key'],
  docs: ['repo/docs/tour/shapes.md', 'repo/static/d2/shapes-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
