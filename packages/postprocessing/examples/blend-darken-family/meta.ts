// postprocessing example: Blend functions: darken, multiply, burn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: darken, multiply, burn',
  summary:
    'A colour-picker picture laid over the scene with the darkening family in turn: DARKEN keeps the darker colour, MULTIPLY multiplies, COLOR_BURN and LINEAR_BURN darken harder. Each leaves white untouched and pushes dark areas toward black.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'DARKEN', 'MULTIPLY', 'COLOR_BURN', 'LINEAR_BURN'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/darken.frag', 'repo/src/effects/blending/glsl/multiply.frag', 'repo/src/effects/blending/glsl/color-burn.frag', 'repo/src/effects/blending/glsl/linear-burn.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
