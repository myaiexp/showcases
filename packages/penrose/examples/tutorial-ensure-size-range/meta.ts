// penrose example: Size range with ensure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Size range with ensure',
  summary:
    'An `ensure x.icon.r > 25` line is shorthand for the `greaterThan` constraint, and `<` is `lessThan`. The tabs bound radii to different windows (25 to 40, 60 to 90, 120 to 150) and the three sets follow them.',
  section: 'Tutorial: Predicates & Constraints',
  tags: ['ensure', 'greaterThan', 'lessThan', 'Circle'],
  docs: ['repo/packages/docs-site/docs/tutorial/predicates.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
