// fabric example: Controls: Default control sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Default control sets',
  summary:
    "createObjectDefaultControls() builds the nine standard handlers, createResizeControls() only the width handles ml and mr, and createTextboxDefaultControls() combines them. Switch the set on a Rect and compare with a Textbox.",
  section: 'Controls',
  tags: ['createObjectDefaultControls','createResizeControls','createTextboxDefaultControls','controls','Textbox'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createObjectDefaultControls.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createResizeControls.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createTextboxDefaultControls.md', 'repo/src/content/docs/api/classes/Textbox.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
