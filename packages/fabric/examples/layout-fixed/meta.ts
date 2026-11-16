// fabric example: Layout managers: FixedLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: FixedLayout',
  summary:
    'new LayoutManager(new FixedLayout()) keeps the width and height passed to the Group: moving or adding members never resizes it, and the sliders set the size directly.',
  section: 'Layout managers',
  tags: ['LayoutManager', 'FixedLayout', 'Group', 'width', 'height'],
  docs: [
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/classes/FixedLayout.md',
    'repo/src/content/docs/api/classes/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
