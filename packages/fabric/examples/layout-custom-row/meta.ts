// fabric example: Layout managers: a row strategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: a row strategy',
  summary:
    'A LayoutStrategy subclass sorts the members by position and sets their left and top to form a row, skipping the layout while a member is dragged and running it on release, so dropping a member reorders the row.',
  section: 'Layout managers',
  tags: ['LayoutStrategy', 'FitContentLayout', 'shouldPerformLayout', 'calcBoundingBox', 'LayoutManager', 'Group'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutStrategy.md',
    'repo/src/content/docs/api/classes/FitContentLayout.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
