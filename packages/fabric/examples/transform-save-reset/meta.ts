// fabric example: Transformations: saveObjectTransform and resetObjectTransform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: saveObjectTransform and resetObjectTransform',
  summary:
    "saveObjectTransform(object) returns the scale, skew, angle, flip, left and top; resetObjectTransform(object) clears scale, skew, flip and angle; set(saved) puts the saved values back.",
  section: 'Transformations',
  tags: ['saveObjectTransform','resetObjectTransform','scaleX','skewX','angle'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/saveObjectTransform.md', 'repo/src/content/docs/api/namespaces/util/functions/resetObjectTransform.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
