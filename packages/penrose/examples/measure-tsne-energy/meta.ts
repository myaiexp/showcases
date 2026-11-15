// penrose example: tsneEnergy: laying out clusters in 2D
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'tsneEnergy: laying out clusters in 2D',
  summary:
    'Eight points in three dimensions fall into two clusters, near the origin and far from it. `tsneEnergy(highDim, projected)` compares how neighbours relate in both spaces; the red and blue discs are free 2D positions, and minimising the energy makes them keep their clusters together on the page.',
  section: 'Computation: Curve Measures',
  tags: ['tsneEnergy', 'minimal'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Curves.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
