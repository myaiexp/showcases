// penrose example: Matching deduplication
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mirror matches run only once',
  summary:
    'The header `forall Set x; Set y` could map x and y to A and B in two orders, but Penrose runs the block once per unordered pair. Each match adds one square to the tally row using `match_id`, so n sets give n(n-1)/2 squares: 1, 3 and 6.',
  section: 'Style: Selectors',
  tags: ['matching', 'deduplication', 'match_id', 'forall'],
  docs: ['repo/packages/docs-site/docs/ref/style/selectors.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
