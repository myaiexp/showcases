// Draggable example: snap increments and per-axis locks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable snap grid and axis locks',
  summary: 'A square that snaps to a grid on release. Change the snap size live through snapX and snapY, or lock an axis with x: false and y: false.',
  section: 'Draggable',
  tags: ['createDraggable', 'snap', 'x', 'y', 'snapX', 'snapY', 'container', 'setX', 'setY', 'onSnap'],
  docs: [
    'pages/animejs-com/documentation/draggable.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/snap.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/x.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/y.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/setx.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onsnap.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
