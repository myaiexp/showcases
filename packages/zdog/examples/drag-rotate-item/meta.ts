// Zdog example: a toy rocket that turns on its podium
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag-rotate one item',
  summary:
    'A toy rocket on a podium: drag and only the rocket turns, while the floor ring and podium stay where they are. Setting dragRotate to an item instead of true tells Illustration which part of the scene the drag should rotate.',
  section: 'API: Illustration',
  tags: ['Illustration', 'dragRotate', 'addChild', 'onDragStart', 'onDragEnd'],
  docs: ['repo/modules/docs/api-illo.hbs', 'repo/modules/docs/api-dragger.hbs', 'repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
