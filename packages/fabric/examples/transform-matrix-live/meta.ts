// fabric example: Transformations: The matrix of an object while it moves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: The matrix of an object while it moves',
  summary:
    "calcOwnMatrix() is an object's transform in its parent plane, calcTransformMatrix() the one that includes its groups. Both are shown as numbers for a rectangle in a group that you drag, scale and rotate.",
  section: 'Transformations',
  tags: ['calcOwnMatrix','calcTransformMatrix','Group','after:render'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
