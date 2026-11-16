// fabric example: Layout managers: ClipPathLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: ClipPathLayout',
  summary:
    'new LayoutManager(new ClipPathLayout()) makes a Group as large as its clipPath rather than its members. Resizing the clip shape and calling triggerLayout() re-fits the group around it.',
  section: 'Layout managers',
  tags: ['LayoutManager', 'ClipPathLayout', 'Group', 'clipPath', 'triggerLayout'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/ClipPathLayout.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
