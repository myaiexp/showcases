// penrose example: then reads transformations left to right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'then reads transformations left to right',
  summary:
    'The keyword `then` composes transformations in the order you say them: `translate(110, 0) then rotate(0.8)` slides the square out and then swings it around the origin, while `rotate(0.8) then translate(110, 0)` spins it in place first. The third tab writes the first one as a product, `rotate(0.8) * translate(110, 0)`, and draws the same square.',
  section: 'Style: Vectors & Matrices',
  tags: ['then', 'translate', 'rotate', 'homogeneous', 'composition'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
