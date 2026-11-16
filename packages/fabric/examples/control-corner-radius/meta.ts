// fabric example: Controls: A corner-radius handle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: A corner-radius handle',
  summary:
    "A custom Control whose positionHandler tracks rect.rx along the top edge and whose actionHandler turns the pointer into a new rx and ry, with util.sendPointToPlane mapping scene points into the rectangle's own plane.",
  section: 'Controls',
  tags: ['Control','positionHandler','actionHandler','rx','ry','sendPointToPlane','calcTransformMatrix'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/classes/Rect.md', 'repo/src/content/docs/api/namespaces/util/functions/sendPointToPlane.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
