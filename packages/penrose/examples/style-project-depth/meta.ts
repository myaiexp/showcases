// penrose example: projectDepth shades corners by distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'projectDepth shades corners by distance',
  summary:
    'The function `projectDepth` returns the window position of a 3D point and its depth. The eight corners are Substance facts `At(v, x, y, z)` whose literal numbers the selector reads straight into `projectDepth`, and the third component of the answer sets the size and colour of each dot, so the near corners are large and warm and the far ones small and cool.',
  section: 'Style: Vectors & Matrices',
  tags: ['projectDepth', 'perspective', 'literal', 'repeatable', 'depth', 'Circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/docs-site/docs/ref/style/literals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
