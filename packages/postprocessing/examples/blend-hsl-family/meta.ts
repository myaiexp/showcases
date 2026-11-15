// postprocessing example: Blend functions: hue, saturation, color, luminosity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: hue, saturation, color, luminosity',
  summary:
    'HUE, SATURATION, COLOR and LUMINOSITY convert both colours to HSL and take one part from the layer and the rest from the scene. The layer is a hue sweep, so HUE and COLOR recolour the scene while LUMINOSITY only changes the light levels.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'HUE', 'SATURATION', 'COLOR', 'LUMINOSITY'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/hue.frag', 'repo/src/effects/blending/glsl/saturation.frag', 'repo/src/effects/blending/glsl/color.frag', 'repo/src/effects/blending/glsl/luminosity.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
