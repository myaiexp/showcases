// fabric example: Transformations: Points across planes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Points across planes',
  summary:
    "util.sendPointToPlane(point, from, to) re-expresses a point in another plane. A dragged dot is read in canvas, viewport and rotated-group coordinates, and sent back from the group to the canvas.",
  section: 'Transformations',
  tags: ['sendPointToPlane','calcPlaneChangeMatrix','viewportTransform','calcTransformMatrix','Group'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/sendPointToPlane.md', 'repo/src/content/docs/api/namespaces/util/functions/calcPlaneChangeMatrix.md', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
