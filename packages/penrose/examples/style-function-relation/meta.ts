// penrose example: Function applications in selectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Match a function application',
  summary:
    'A relation can be a function application written `u := Union(a, b)`. The block runs for the set that Substance defines with `Union` and for its two arguments, and draws the result as the big circle that contains both.',
  section: 'Style: Selectors',
  tags: ['function', 'relation', 'where', 'contains'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
