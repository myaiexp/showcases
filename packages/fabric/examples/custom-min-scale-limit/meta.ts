// fabric example: Customization: minScaleLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: minScaleLimit',
  summary:
    'minScaleLimit is the smallest absolute value scaleX and scaleY may take. Without it an object can be dragged down to a sliver; with it the corner handle simply stops.',
  section: 'Customization',
  tags: ['minScaleLimit', 'scaleX', 'scaleY', 'object:scaling', 'setActiveObject'],
  docs: [
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
