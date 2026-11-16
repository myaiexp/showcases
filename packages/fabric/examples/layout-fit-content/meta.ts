// fabric example: Layout managers: FitContentLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: FitContentLayout',
  summary:
    'A Group\'s LayoutManager uses FitContentLayout by default: the group box grows and shrinks around its members when they are dragged inside an interactive group. Changes made from code wait for triggerLayout().',
  section: 'Layout managers',
  tags: ['LayoutManager', 'FitContentLayout', 'Group', 'triggerLayout', 'interactive', 'subTargetCheck'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/FitContentLayout.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
