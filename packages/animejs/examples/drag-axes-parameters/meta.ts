// Draggable example: per-axis parameter objects (x, y) combined with global parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable per-axis parameters',
  summary: 'Three squares receive the same diagonal drag. One has x: { snap } with y disabled, one the reverse, and one mixes a global snap with an x-specific snap array, so each ends up at a different place.',
  section: 'Draggable',
  tags: ['createDraggable', 'x', 'y', 'snap', 'axes parameters'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/x.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/y.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/snap.md',
    'pages/animejs-com/documentation/draggable/draggable-settings/velocitymultiplier.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
