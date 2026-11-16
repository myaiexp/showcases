// fabric example: Customization: borderOpacityWhenMoving
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: borderOpacityWhenMoving',
  summary:
    'borderOpacityWhenMoving is the opacity the selection frame has while the object is being dragged. Set it to 0 to hide the frame during a move, or 1 to keep it solid.',
  section: 'Customization',
  tags: ['borderOpacityWhenMoving', 'isMoving', 'object:moving', 'borderColor', 'hasControls'],
  docs: [
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
