// Draggable example: scrollSpeed and scrollThreshold control the container's automatic scrolling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable auto-scroll speed and threshold',
  summary: 'A square is dragged toward the far corner of a scrollable grid and the container scrolls itself once the square crosses the scroll threshold. Sliders change scrollSpeed and scrollThreshold live and a readout shows the scroll offsets.',
  section: 'Draggable',
  tags: ['createDraggable', 'scrollSpeed', 'scrollThreshold', 'container'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/scrollspeed.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/scrollthreshold.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
