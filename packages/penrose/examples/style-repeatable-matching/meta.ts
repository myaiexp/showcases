// penrose example: Repeatable matching
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeatable matching and self-edges',
  summary:
    'By default two style variables must map to different Substance objects, so `forall Node a; Node b where Edge(a, b)` skips the self-edge `Edge(X, X)`. Adding `repeatable` lets a and b both map to X. Each match puts a red dot at the midpoint of its edge, so only the repeatable tab shows a dot on top of X.',
  section: 'Style: Selectors',
  tags: ['repeatable', 'forall', 'where', 'self-edge'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/selectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
