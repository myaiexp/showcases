// fabric example: Customization: lock scaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: lock scaling',
  summary:
    'lockScalingX and lockScalingY block scaling along one axis, and lockScalingFlip stops a handle dragged past the opposite edge from mirroring the object.',
  section: 'Customization',
  tags: ['lockScalingX', 'lockScalingY', 'lockScalingFlip', 'uniformScaling', 'object:scaling', 'flipX'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
