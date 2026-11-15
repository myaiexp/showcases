// penrose example: distributeVertically: a column with fixed gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "distributeVertically: a column with fixed gaps",
  summary:
    'Three circles are pulled onto the same spot. `ensure distributeVertically([a.icon, b.icon, c.icon], padding)` stacks them with a fixed gap between their bounding boxes. Which end the list starts from depends on the last argument.',
  section: "Constraint Functions",
  tags: ['distributeVertically', 'ensure', 'constraint', 'padding', 'shape list'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
