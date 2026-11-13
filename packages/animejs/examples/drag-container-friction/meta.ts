// Draggable example: container bounds, containerFriction and animateInView
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable container bounds and friction',
  summary: 'Two draggables share a container. One drags freely past the edge (friction 0), the other is stopped at it (friction 1). Change friction live, or pull the square back with animateInView().',
  section: 'Draggable',
  tags: ['createDraggable', 'container', 'containerFriction', 'releaseContainerFriction', 'animateInView'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-settings/container.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/containerfriction.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/releasecontainerfriction.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/animateinview.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
