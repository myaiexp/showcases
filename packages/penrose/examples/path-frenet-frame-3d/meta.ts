// penrose example: binormalVectors: the Frenet frame of a helix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'binormalVectors: the Frenet frame of a helix',
  summary:
    'Points with three coordinates make a helix with sampled radius, drawn with z going up the page and y squashed. `tangentVectors`, `normalVectors` and `binormalVectors` give a frame at each of five points: tangent in blue, principal normal in red, binormal in green. `binormalVectors` needs 3D points.',
  section: 'Computation: Paths & Curves',
  tags: ['binormalVectors', 'tangentVectors', 'normalVectors'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
