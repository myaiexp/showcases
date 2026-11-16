// fabric example: Controls: getLocalPoint in a handler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: getLocalPoint in a handler',
  summary:
    "Inside a hand-written actionHandler, controlsUtils.getLocalPoint maps the pointer into the object's own, unrotated axes relative to the transform origin, which makes a height handle for a rotated, scaled Rect a few lines long.",
  section: 'Controls',
  tags: ['getLocalPoint','wrapWithFixedAnchor','actionHandler','Control','height'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/getLocalPoint.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/wrapWithFixedAnchor.md', 'repo/src/content/docs/api/classes/Control.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
