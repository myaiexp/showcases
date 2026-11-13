// Draggable example: scrollInView(duration, gap) scrolls the container to reveal the draggable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable scrollInView()',
  summary: 'A square is placed outside the visible area of a scrollable grid, then scrollInView() animates the container\'s scroll to reveal it. Sliders set the duration and the gap from the edges; a readout shows the scroll position.',
  section: 'Draggable',
  tags: ['createDraggable', 'scrollInView', 'container', 'stop'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-methods.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/scrollinview.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/stop.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
