// postprocessing example: chaining two LUTs into one with LookupTexture.applyLUT
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT applyLUT',
  summary:
    'applyLUT() bakes a second LUT into the first, so two grades become one table (both must be same-size RGBA float LUTs). A bleach-bypass grade, a teal-and-orange grade and their combination are shown with a single LUT3DEffect.',
  section: 'Color Grading',
  tags: ['LookupTexture', 'applyLUT', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
