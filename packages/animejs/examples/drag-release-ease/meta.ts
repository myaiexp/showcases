// Draggable example: releaseEase, spring and release damping compared side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable release easing and springs',
  summary: 'Four draggables in one container with different release settings: the default outQuint, releaseEase outElastic, releaseEase spring(), and a low releaseDamping. These settings apply when you throw a square in the full view; the preview and the demo button only replay each lane\'s ease through animateInView() (releaseDamping has no such replay).',
  section: 'Draggable',
  tags: ['createDraggable', 'releaseEase', 'releaseDamping', 'spring', 'animateInView'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings/releaseease.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/releasedamping.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/animateinview.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
