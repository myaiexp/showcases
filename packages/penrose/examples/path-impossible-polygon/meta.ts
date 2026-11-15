// penrose example: Penrose: the impossible polygon path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Penrose: the impossible polygon path',
  summary:
    'The `Penrose` function returns path data for an "impossible polygon" with `nSides` sides, a hole sized as a fraction of the outer radius, a rotation angle and a chirality, `"cw"` or `"ccw"`. The tabs change the side count and the twist direction; the rotation and hole size are sampled.',
  section: 'Computation: Paths & Curves',
  tags: ['Penrose', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
