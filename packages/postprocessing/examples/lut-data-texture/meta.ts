// postprocessing example: LookupTexture.toDataTexture feeding LUT3DEffect a 2D LUT
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT toDataTexture',
  summary:
    'toDataTexture() flattens a 3D LookupTexture into a 2D DataTexture (the slices stacked vertically), which LUT3DEffect also accepts, for contexts without 3D textures. The checkbox swaps between the two forms of the same grade; the picture stays the same.',
  section: 'Color Grading',
  tags: ['LookupTexture', 'toDataTexture', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
