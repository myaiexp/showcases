// fabric example: Controls: wrapWithFixedAnchor and wrapWithFireEvent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: wrapWithFixedAnchor and wrapWithFireEvent',
  summary:
    "A hand-written width handler built on getLocalPoint, wrapped in wrapWithFixedAnchor so the opposite edge stays put, and in wrapWithFireEvent so it fires a 'resizing' event. A checkbox removes the anchor to show the drift.",
  section: 'Controls',
  tags: ['wrapWithFixedAnchor','wrapWithFireEvent','getLocalPoint','actionHandler','resizing','Control'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/wrapWithFixedAnchor.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/wrapWithFireEvent.md', 'repo/src/content/docs/api/namespaces/controlsUtils/functions/getLocalPoint.md', 'repo/src/content/docs/api/classes/Control.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
