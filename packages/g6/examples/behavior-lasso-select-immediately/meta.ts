// g6 example: Lasso select: immediately and state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lasso select: immediately and state',
  summary: 'immediately: true applies the state while the loop is still being drawn; state switches between the built-in selected state and a custom one. Edges are selected when both ends are inside.',
  section: 'Behavior',
  tags: ['lasso-select', 'immediately', 'state', 'enableElements'],
  docs: ['repo/packages/site/docs/manual/behavior/LassoSelect.en.md', 'repo/packages/site/common/api/behaviors/lasso-select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
