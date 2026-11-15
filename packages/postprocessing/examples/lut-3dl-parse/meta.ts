// postprocessing example: LUT3dlLoader.parse on .3dl text generated in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT from .3dl text',
  summary:
    'A .3dl file is generated as a string (a grid line, then 10-bit RGB lines with blue varying fastest) and parsed by LUT3dlLoader.parse(). The loader reads the bit depth off the largest value and scales everything into 0 to 1.',
  section: 'Color Grading',
  tags: ['LUT3dlLoader', 'parse', 'LookupTexture', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/loaders/LUT3dlLoader.js', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
