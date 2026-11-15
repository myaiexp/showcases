// postprocessing example: LUT3DEffect inputColorSpace sRGB against linear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT3D input colour space',
  summary:
    'LUT3DEffect converts its input into the inputColorSpace option (sRGB by default) before looking the colour up. The same grade is built twice, once with SRGBColorSpace and once with LinearSRGBColorSpace, in two passes where only one is enabled at a time.',
  section: 'Color Grading',
  tags: ['LUT3DEffect', 'inputColorSpace', 'SRGBColorSpace', 'LinearSRGBColorSpace', 'renderToScreen'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
