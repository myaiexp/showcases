// Draggable example: velocityMultiplier scales the velocity applied at release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable velocityMultiplier throw',
  summary: 'Four squares receive an identical flick and are released with velocityMultiplier 0, 0.5, 1 and 5. The first stops dead, the last is thrown furthest; a readout shows where each one ended up.',
  section: 'Draggable',
  tags: ['createDraggable', 'velocityMultiplier', 'reset'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/velocitymultiplier.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
