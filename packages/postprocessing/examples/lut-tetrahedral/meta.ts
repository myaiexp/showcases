// postprocessing example: tetrahedralInterpolation on and off with a 4x4x4 LUT
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT tetrahedral interpolation',
  summary:
    'A tiny 4x4x4 LUT with a strong non-linear grade is the worst case for interpolation. LUT3DEffect samples it with the GPU trilinear filter by default; tetrahedralInterpolation switches to the slower, more accurate manual tetrahedral blend and the colour bands change shape.',
  section: 'Color Grading',
  tags: ['LUT3DEffect', 'tetrahedralInterpolation', 'LookupTexture', 'createNeutral'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
