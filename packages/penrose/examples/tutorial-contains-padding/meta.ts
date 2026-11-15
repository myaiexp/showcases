// penrose example: Padding on contains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Padding on contains',
  summary:
    'The third argument of `contains(B.icon, A.icon, padding)` is the margin kept between the two borders. The tabs use 5, 30 and 60, and the inner circle sits further inside the outer one each time.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['contains', 'ensure', 'padding', 'predicate'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
