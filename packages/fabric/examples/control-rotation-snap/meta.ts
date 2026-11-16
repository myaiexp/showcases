// fabric example: Controls: Rotation with snapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Rotation with snapping',
  summary:
    "The rotate handle is a Control whose actionHandler is rotationWithSnapping and whose cursorStyleHandler is rotationStyleHandler. It snaps to snapAngle within snapThreshold and stops when lockRotation is on.",
  section: 'Controls',
  tags: ['rotationWithSnapping','rotationStyleHandler','snapAngle','snapThreshold','lockRotation','Control','withConnection'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/rotationWithSnapping.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/rotationStyleHandler.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
