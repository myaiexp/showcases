// Draggable example: minVelocity and maxVelocity bound the throw applied after release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable minVelocity and maxVelocity',
  summary: 'Four squares get the same slow drag and the same fast flick. minVelocity 10 makes even a slow release throw the square, maxVelocity 0 kills the throw, and maxVelocity 100 lets a fast flick travel further than the default.',
  section: 'Draggable',
  tags: ['createDraggable', 'minVelocity', 'maxVelocity', 'reset'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/minvelocity.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/maxvelocity.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
