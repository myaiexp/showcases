// fabric example: Transformations: Moving an object into a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Moving an object into a group',
  summary:
    "Adding an object to a group reads its left, top and angle in the group's plane, so it jumps. util.sendObjectToPlane(object, from, to) rewrites them for the target plane first, in and out of a tilted Group.",
  section: 'Transformations',
  tags: ['sendObjectToPlane','calcPlaneChangeMatrix','Group','add','remove','calcTransformMatrix'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/sendObjectToPlane.md', 'repo/src/content/docs/api/namespaces/util/functions/calcPlaneChangeMatrix.md', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
