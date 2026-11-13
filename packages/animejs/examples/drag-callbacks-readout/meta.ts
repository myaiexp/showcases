// Draggable example: every drag callback feeding a live readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable callbacks live readout',
  summary: 'Counters for onGrab, onDrag, onUpdate, onRelease, onSnap and onSettle, plus live x, y and velocity read from the draggable properties.',
  section: 'Draggable',
  tags: ['createDraggable', 'onGrab', 'onDrag', 'onUpdate', 'onRelease', 'onSnap', 'onSettle', 'velocity', 'x', 'y'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-callbacks.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/ongrab.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/ondrag.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onupdate.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onrelease.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onsnap.md',
    'pages/animejs-com/documentation/draggable/draggable-callbacks/onsettle.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/setx.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
