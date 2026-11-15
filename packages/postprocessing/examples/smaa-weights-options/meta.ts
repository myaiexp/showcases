// postprocessing example: SMAA weights material options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA search steps and corners',
  summary:
    'The blend weights an SMAAEffect computes, with the SMAAWeightsMaterial options live: how far the orthogonal and diagonal searches run, whether diagonal patterns and corners are detected, and how much corners are rounded. Short searches leave long edges stepped.',
  section: 'Antialiasing',
  tags: ['SMAAEffect', 'weightsMaterial', 'orthogonalSearchSteps', 'diagonalSearchSteps', 'diagonalDetection', 'cornerRounding', 'cornerDetection', 'weightsTexture'],
  docs: ['repo/README.md', 'repo/src/effects/SMAAEffect.js', 'repo/src/materials/SMAAWeightsMaterial.js', 'repo/src/enums/SMAAPreset.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
