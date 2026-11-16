// fabric example: Customization: lock rotation and skewing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: lock rotation and skewing',
  summary:
    'lockRotation blocks the rotate handle; lockSkewingX and lockSkewingY block skewing from the top/bottom and side handles (Shift-drag). Each locked action shows a not-allowed cursor.',
  section: 'Customization',
  tags: ['lockRotation', 'lockSkewingX', 'lockSkewingY', 'skewX', 'skewY', 'object:rotating', 'object:skewing'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
