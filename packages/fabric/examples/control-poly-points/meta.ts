// fabric example: Controls: Editing polygon points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Editing polygon points',
  summary:
    "controlsUtils.createPolyControls(poly) builds one Control per point, each with its own position and action handler, so dragging a handle moves that vertex. A checkbox swaps back to the default controls.",
  section: 'Controls',
  tags: ['createPolyControls','createPolyPositionHandler','createPolyActionHandler','polyActionHandler','Polygon','controls'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createPolyControls.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createPolyPositionHandler.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/createPolyActionHandler.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/polyActionHandler.md', 'repo/src/content/docs/api/classes/Polygon.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
