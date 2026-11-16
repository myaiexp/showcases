// fabric example: Controls: Each object has its own controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Each object has its own controls',
  summary:
    "Assigning obj.controls on one object gives it its own set: the second rectangle keeps only two corners, the third has resize handles on its sides and the rotate handle, built with createObjectDefaultControls and createResizeControls.",
  section: 'Controls',
  tags: ['controls','createObjectDefaultControls','createResizeControls','Control'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createObjectDefaultControls.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createResizeControls.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
