// g6 example: Lasso select: mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lasso select: mode',
  summary: 'mode decides how a lassoed loop combines with the current selection: default replaces it, union adds, intersect keeps the already selected, diff toggles.',
  section: 'Behavior',
  tags: ['lasso-select', 'mode', 'union', 'intersect', 'diff', 'default'],
  docs: ['repo/packages/site/docs/manual/behavior/LassoSelect.en.md', 'repo/packages/site/common/api/behaviors/lasso-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
