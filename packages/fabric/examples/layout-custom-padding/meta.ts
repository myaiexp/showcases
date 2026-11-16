// fabric example: Layout managers: a padding strategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: a padding strategy',
  summary:
    'A subclass of FitContentLayout overrides calcBoundingBox() to add padding to the size the layout manager commits, so the group box keeps a margin around its members.',
  section: 'Layout managers',
  tags: ['LayoutStrategy', 'FitContentLayout', 'calcBoundingBox', 'LayoutManager', 'Group', 'triggerLayout', 'LayoutStrategyResult'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutStrategy.md',
    'repo/src/content/docs/api/classes/FitContentLayout.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/type-aliases/LayoutStrategyResult.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
