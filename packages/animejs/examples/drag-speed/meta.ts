// Draggable example: dragSpeed scales how far the element moves per pixel of pointer travel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable dragSpeed lanes',
  summary: 'Five squares with dragSpeed -1, 0, 0.5, 1 and 2 receive the same 120px pointer drag: one goes backwards, one stays put, the others cover different distances. A readout lists each lane\'s x.',
  section: 'Draggable',
  tags: ['createDraggable', 'dragSpeed', 'velocityMultiplier', 'reset'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/dragspeed.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/velocitymultiplier.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
