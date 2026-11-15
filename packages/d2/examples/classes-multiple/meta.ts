// d2 example: Several classes, applied in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Several classes, applied in order',
  summary:
    'An array value applies several classes, left to right, so the later class wins on any attribute both set. The first tab combines an icon class with a shape class; the second swaps the order of two labelling classes.',
  section: 'Classes',
  tags: ['classes', 'array', 'order'],
  docs: ['repo/docs/tour/classes.md', 'repo/static/d2/multiple-classes.d2', 'repo/static/d2/ordered-classes.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
