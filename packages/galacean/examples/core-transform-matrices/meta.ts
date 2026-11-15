// galacean example: Transform: localMatrix and worldMatrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: localMatrix and worldMatrix",
  summary:
    "A child's localMatrix and worldMatrix shown as 4x4 grids while the parent turns. The local one stays fixed, the world one follows the parent.",
  section: "Core",
  tags: ['Transform', 'localMatrix', 'worldMatrix', 'Matrix'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
