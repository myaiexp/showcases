// Draggable example: onResize and onAfterResize run when the container changes size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable onResize and onAfterResize',
  summary: 'The draggable\'s container grows and shrinks (automatically in the card, with a slider in the full view). Each resize bumps two counters, one per callback, and onAfterResize animates the square back inside the shrunken bounds.',
  section: 'Draggable',
  tags: ['createDraggable', 'onResize', 'onAfterResize', 'animateInView'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-callbacks.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onresize.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onafterresize.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/animateinview.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
