// fabric example: Layout managers: what triggers a layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: what triggers a layout',
  summary:
    'add(), remove() and dragging a member of an interactive group make the layout manager run a layout; FitContentLayout measures every time, FixedLayout skips them, a plain set() triggers nothing and triggerLayout() always measures.',
  section: 'Layout managers',
  tags: ['LayoutManager', 'FitContentLayout', 'FixedLayout', 'layout:after', 'triggerLayout', 'Group', 'LayoutAfterEvent'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/LayoutStrategy.md',
    'repo/src/content/docs/api/classes/FitContentLayout.md',
    'repo/src/content/docs/api/classes/FixedLayout.md',
    'repo/src/content/docs/api/interfaces/GroupEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
