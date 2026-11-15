// penrose example: Sets first, labels second
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sets first, labels second',
  summary:
    'A Venn-style diagram staged as `[shape, label]`. In `shape` the circles nest (`contains`) and keep apart (`disjoint`); in `label` only the Text centres move, and each is kept inside its set with `contains` and pushed toward the set\'s centre.',
  section: 'Layout Stages',
  tags: ['layout', 'in', 'stage', 'contains', 'disjoint', 'Subset'],
  docs: [
    'repo/packages/docs-site/blog/staged-layout.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
