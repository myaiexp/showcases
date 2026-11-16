// fabric example: Controls: Skew handlers on the sides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Skew handlers on the sides',
  summary:
    "Pointing the side controls' actionHandler at skewHandlerX (top, bottom) and skewHandlerY (left, right) with skewCursorStyleHandler makes them skew directly instead of scaling; lockSkewingX/Y switches them off.",
  section: 'Controls',
  tags: ['skewHandlerX','skewHandlerY','skewCursorStyleHandler','skewX','skewY','lockSkewingX','lockSkewingY','Control'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/skewHandlerX.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/skewHandlerY.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/skewCursorStyleHandler.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
