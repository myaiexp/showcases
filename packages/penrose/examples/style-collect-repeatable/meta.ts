// penrose example: Repeatable collectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A repeatable collector may collect the set itself',
  summary:
    'Substance says `Subset(B, B)` as well as `Subset(A, B)` and `Subset(C, B)`. The collector `collect Set s into ss where Subset(s, a) foreach Set a` skips the pair that maps both variables to B, but `collect repeatable` keeps it, so B is counted three times instead of two and its circle grows with `numberof ss`.',
  section: 'Style: Collectors',
  tags: ['collect', 'repeatable', 'foreach', 'numberof', 'Subset'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
