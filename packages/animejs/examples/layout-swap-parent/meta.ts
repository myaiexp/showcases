// Layout example: moving a child between two parents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout swap parent animation',
  summary: 'An item is moved from one container to the next inside layout.update(). The layout animates it from its old position and size to its new parent, while the containers keep their own sizes.',
  section: 'Layout',
  tags: ['createLayout', 'update', 'appendChild', 'animating'],
  docs: [
    'pages/animejs-com/documentation/layout/usage/swap-parent-animation.md',
    'pages/animejs-com/documentation/layout/usage.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
