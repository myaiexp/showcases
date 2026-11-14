// g6 example: Brush select: mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush select: mode',
  summary: 'mode decides how a brushed box combines with the current selection: default replaces it, union adds, intersect keeps the already selected, diff toggles. The card selects two columns and brushes over them in each mode.',
  section: 'Behavior',
  tags: ['brush-select', 'mode', 'union', 'intersect', 'diff', 'default', 'updateBehavior'],
  docs: ['repo/packages/site/docs/manual/behavior/BrushSelect.en.md', 'repo/packages/site/common/api/behaviors/brush-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
