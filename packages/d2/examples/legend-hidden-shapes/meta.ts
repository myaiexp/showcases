// d2 example: Legend: hiding shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend: hiding shapes',
  summary:
    '`a -> b` declares three things (two shapes and a connection) and all three would show in the legend. Setting `opacity: 0` on the shapes leaves only the connection entry. The first tab keeps the shapes, the second hides them.',
  section: 'Legend',
  tags: ['legend', 'opacity'],
  docs: ['repo/docs/tour/legend.md', 'repo/static/d2/legend-hidden.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
