// Layout example: leaveTo state for items hidden during update()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout exit animation for removed items',
  summary: 'Each press hides a tile with display: none inside layout.update(). The tile animates out to the leaveTo state while the rest close the gap, then it is removed from the DOM through layout.leaving.',
  section: 'Layout',
  tags: ['createLayout', 'leaveTo', 'update', 'leaving'],
  docs: [
    'pages/animejs-com/documentation/layout/usage/exit-layout-animation.md',
    'pages/animejs-com/documentation/layout/layout-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
