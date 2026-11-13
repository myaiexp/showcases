// Draggable example: refresh() re-evaluates function parameters, revert() restores and deactivates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable refresh() and revert()',
  summary: 'A draggable whose snap and dragSpeed are random functions: refresh() rolls new values (shown in a readout) and a replayed drag snaps differently. revert() puts the square back and switches the draggable off until a new one is created.',
  section: 'Draggable',
  tags: ['createDraggable', 'refresh', 'revert', 'snap', 'dragSpeed'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-methods.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/refresh.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/revert.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/reset.md',
    'pages/animejs-com/documentation/draggable/draggable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
