// fabric example: Utilities: projectStrokeOnPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: projectStrokeOnPoints',
  summary:
    'util.projectStrokeOnPoints maps each vertex of a path to the outer point its stroke reaches, honouring strokeWidth, strokeLineJoin, strokeLineCap and strokeMiterLimit. The dashed box is built from the projected points.',
  section: 'Utilities',
  tags: ['util.projectStrokeOnPoints', 'strokeLineJoin', 'strokeLineCap', 'strokeMiterLimit', 'util.makeBoundingBoxFromPoints'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/projectStrokeOnPoints.md',
    'repo/src/content/docs/api/namespaces/util/functions/makeBoundingBoxFromPoints.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
