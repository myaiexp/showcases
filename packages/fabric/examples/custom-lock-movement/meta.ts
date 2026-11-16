// fabric example: Customization: lock movement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: lock movement',
  summary:
    'lockMovementX stops an object moving horizontally and lockMovementY vertically; set both and it stays put. The flags combine freely and can be switched per object.',
  section: 'Customization',
  tags: ['lockMovementX', 'lockMovementY', 'hasControls', 'object:moving'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
