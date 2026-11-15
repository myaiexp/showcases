// postprocessing example: LookupTexture colour space and data type conversions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT conversions',
  summary:
    'convertLinearToSRGB() and convertSRGBToLinear() rewrite the output of a float LUT in another colour space (the picture lightens or darkens), and convertToUint8() then packs the data into bytes (it must come last). The readout shows the texture type, colour space and byte size.',
  section: 'Color Grading',
  tags: ['LookupTexture', 'convertLinearToSRGB', 'convertSRGBToLinear', 'convertToUint8'],
  docs: ['repo/README.md', 'repo/src/effects/LUT3DEffect.js', 'repo/src/textures/lut/LookupTexture.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
