// Layout example: enterFrom state for items added during update()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout enter animation for added items',
  summary: 'Each press adds a tile inside layout.update(). The new tile animates in from the enterFrom state with its own duration and ease while the others slide to make room. A readout shows layout.entering.',
  section: 'Layout',
  tags: ['createLayout', 'enterFrom', 'update', 'entering'],
  docs: [
    'pages/animejs-com/documentation/layout/usage/enter-layout-animation.md',
    'pages/animejs-com/documentation/layout/layout-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
