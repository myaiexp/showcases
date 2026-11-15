// postprocessing example: LUTCubeLoader.parse on .cube text generated in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT from .cube text',
  summary:
    'A .cube file is generated as a string (TITLE, LUT_3D_SIZE, then one RGB line per grid point) and handed to LUTCubeLoader.parse(), which returns a LookupTexture for LUT3DEffect. Nothing is fetched; the readout shows the head of the text being parsed.',
  section: 'Color Grading',
  tags: ['LUTCubeLoader', 'parse', 'LookupTexture', 'LUT3DEffect'],
  docs: ['repo/README.md', 'repo/src/loaders/LUTCubeLoader.js', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
