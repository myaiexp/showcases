// postprocessing example: Blend functions: invert, average, hard mix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: invert, average, hard mix',
  summary:
    'The functions that fit no family: INVERT shows the inverted layer, INVERT_RGB multiplies the layer with the inverted scene, AVERAGE takes the mean and HARD_MIX snaps every channel to 0 or 1.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'INVERT', 'INVERT_RGB', 'AVERAGE', 'HARD_MIX'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/invert.frag', 'repo/src/effects/blending/glsl/invert-rgb.frag', 'repo/src/effects/blending/glsl/average.frag', 'repo/src/effects/blending/glsl/hard-mix.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
