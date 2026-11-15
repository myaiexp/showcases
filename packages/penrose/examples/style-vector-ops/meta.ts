// penrose example: Vector arithmetic drawn as arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector arithmetic drawn as arrows',
  summary:
    'Vectors add, subtract, scale and divide like numbers, and `.*` and `./` work one component at a time. Each tab draws `u` in blue and the result in red from the same origin: `u + v`, `u - v`, `0.6 * u`, `u / 2`, `u .* (0.5, 2.0)` and `u ./ (1.5, 0.5)`.',
  section: 'Style: Vectors & Matrices',
  tags: ['vector', 'arithmetic', 'elementwise', 'Line', 'arrowhead'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
