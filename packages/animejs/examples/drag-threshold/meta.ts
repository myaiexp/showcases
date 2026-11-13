// Draggable example: dragThreshold sets how far the pointer must travel before a drag starts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable dragThreshold distance',
  summary: 'Three squares with different dragThreshold values get the same short pointer drag, then a longer one. Squares whose threshold is larger than the short drag stay still; a slider in the full view sets the distance.',
  section: 'Draggable',
  tags: ['createDraggable', 'dragThreshold', 'velocityMultiplier', 'reset'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/dragthreshold.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/velocitymultiplier.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
