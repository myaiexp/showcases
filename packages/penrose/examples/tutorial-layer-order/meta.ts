// penrose example: Layering with above and below
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layering with above and below',
  summary:
    'Two overlapping circles from an `Intersecting` predicate, drawn with `A.icon above B.icon` on one tab and `A.icon below B.icon` on the other. Only the stacking order changes, since layering is a separate statement from `ensure`.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['above', 'below', 'layer', 'overlapping'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
