// penrose example: distributeHorizontally: a row with fixed gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "distributeHorizontally: a row with fixed gaps",
  summary:
    'Three circles are pulled onto the same spot. `ensure distributeHorizontally([a.icon, b.icon, c.icon], padding)` lines them up left to right in the order of the list with a fixed gap between their bounding boxes; passing `false` as the third argument reverses the order.',
  section: "Constraint Functions",
  tags: ['distributeHorizontally', 'ensure', 'constraint', 'padding', 'shape list'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
