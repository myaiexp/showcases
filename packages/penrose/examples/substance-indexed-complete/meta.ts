// penrose example: All pairs: i < j
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'All pairs: i < j',
  summary:
    'A `where i < j` filter over two indices makes each unordered pair exactly once, so four nodes get all six edges of a complete graph. Swapping to `i <= j` would add loops, and `i != j` would double every edge.',
  section: 'Substance',
  tags: ['indexed', 'where', '<', 'cartesian', 'predicate'],
  docs: ['repo/packages/docs-site/docs/ref/substance/indexed-statements.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
