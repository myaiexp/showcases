// penrose example: Which pairs a where clause matches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A where clause picks the matching pairs',
  summary:
    'With `Subset(A, B)` and `Subset(B, C)` in Substance, the header `forall Set x; Set y where Subset(x, y)` considers six possible mappings and keeps two. Each kept match draws one arrow, from the subset to the superset, and no arrow joins A and C.',
  section: 'Style: Selectors',
  tags: ['forall', 'where', 'predicate', 'mapping', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
