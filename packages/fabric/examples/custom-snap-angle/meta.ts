// fabric example: Customization: snapAngle and snapThreshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: snapAngle and snapThreshold',
  summary:
    'With snapAngle set, rotating with the handle snaps the angle to multiples of it when the pointer is within snapThreshold degrees; elsewhere it turns freely.',
  section: 'Customization',
  tags: ['snapAngle', 'snapThreshold', 'angle', 'object:rotating', 'setActiveObject'],
  docs: [
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
