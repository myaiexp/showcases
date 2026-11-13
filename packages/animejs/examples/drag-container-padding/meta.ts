// Draggable example: containerPadding insets the drag area, here driven by a function and refresh()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable containerPadding bounds',
  summary: 'A square is pushed into the corners of a container whose drag area is inset by containerPadding (a dashed box shows it). In the full view four sliders change the padding returned by a function and call refresh().',
  section: 'Draggable',
  tags: ['createDraggable', 'containerPadding', 'refresh', 'animateInView'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/containerpadding.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/refresh.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/animateinview.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
