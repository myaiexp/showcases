// penrose example: Matrix operators on a square
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matrix operators on a square',
  summary:
    'With A a rotation by 0.6 radians and B a stretch by 1.6 and 0.6, the same unit square is drawn after `A * B` (stretch, then rotate), `A then B` (rotate, then stretch), the transpose written with a trailing quote mark, the sum `A + B` and the elementwise product `A .* B`. The grey outline is the original.',
  section: 'Style: Vectors & Matrices',
  tags: ['matrix', 'operators', 'then', 'transpose', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
