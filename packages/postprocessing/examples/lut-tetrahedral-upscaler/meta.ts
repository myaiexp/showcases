// postprocessing example: TetrahedralUpscaler.expand growing LUT data on the main thread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TetrahedralUpscaler.expand',
  summary:
    'TetrahedralUpscaler.expand(data, size) is the synchronous version of scaleUp: it takes RGBA LUT data and returns a bigger array. The slider rebuilds a LookupTexture from the expanded data of a 4x4x4 grade, from 4 up to 32.',
  section: 'Color Grading',
  tags: ['TetrahedralUpscaler', 'expand', 'LookupTexture', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/textures/lut/TetrahedralUpscaler.js', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
