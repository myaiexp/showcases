// postprocessing example: LookupTexture.scaleUp growing a tiny LUT in a worker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT scaleUp',
  summary:
    'LookupTexture.scaleUp(size, false) resamples a 4x4x4 LUT into a bigger one with tetrahedral interpolation in a Web Worker and resolves a Promise with a new LUT. The effect swaps between the coarse original and the scaled copy; passing false keeps the original data intact.',
  section: 'Color Grading',
  tags: ['LookupTexture', 'scaleUp', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js', 'repo/src/textures/lut/TetrahedralUpscaler.js', 'repo/src/enums/LUTOperation.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
