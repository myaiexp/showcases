// Draggable example: axis modifiers with utils.wrap and mapTo onto other properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable modifier wrap and mapTo',
  summary: 'Left: a modifier wraps the dragged value so the square re-enters from the opposite side. Right: mapTo turns the x axis into rotateY and the y axis into z depth.',
  section: 'Draggable',
  tags: ['createDraggable', 'modifier', 'mapTo', 'utils.wrap', 'utils.set', 'setX', 'setY'],
  docs: [
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/modifier.md',
    'pages/animejs-com/documentation/draggable/draggable-axes-parameters/mapto.md',
    'pages/animejs-com/documentation/draggable/draggable-methods/setx.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
