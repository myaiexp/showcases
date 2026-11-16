// fabric example: Transformations: invertTransform and the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: invertTransform and the pointer',
  summary:
    "Multiplying the viewport matrix by an object's calcTransformMatrix and inverting it with invertTransform sends a pointer position into the object's own axes, where (0, 0) is its centre. Click to read the local point.",
  section: 'Transformations',
  tags: ['invertTransform','multiplyTransformMatrices','calcTransformMatrix','viewportTransform','viewportPoint'],
  docs: ['repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/invertTransform.md', 'repo/src/content/docs/api/namespaces/util/functions/multiplyTransformMatrices.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
