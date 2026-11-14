// g6 example: Click select: degree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click select: degree',
  summary: 'degree spreads the selection from the clicked node to its direct neighbours and their neighbours; the rest dim through unselectedState. The card clicks the root at degree 0, 1 and 2.',
  section: 'Behavior',
  tags: ['click-select', 'degree', 'unselectedState', 'inactive'],
  docs: ['repo/packages/site/docs/manual/behavior/ClickSelect.en.md', 'repo/packages/site/common/api/behaviors/click-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
