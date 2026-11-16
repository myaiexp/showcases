// fabric example: Controls: Hiding controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Hiding controls',
  summary:
    "object.setControlVisible(key, bool) and setControlsVisibility({...}) hide single handlers of one object, and hasControls hides them all. The checkboxes call them for each of the nine standard control keys.",
  section: 'Controls',
  tags: ['setControlsVisibility','setControlVisible','isControlVisible','hasControls','controls'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Control.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
