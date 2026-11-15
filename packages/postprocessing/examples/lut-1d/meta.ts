// postprocessing example: LUT1DEffect remapping each channel through a 256-texel curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LUT1D curves',
  summary:
    'LUT1DEffect looks every channel up in a one-row texture, so the texture is a tone curve. A 256 by 1 DataTexture is rewritten here with an invert, an S-curve, a solarize and a posterize curve.',
  section: 'Color Grading',
  tags: ['LUT1DEffect', 'lut', 'DataTexture'],
  docs: ['repo/README.md', 'repo/src/effects/LUT1DEffect.js', 'repo/src/effects/glsl/lut-1d.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
