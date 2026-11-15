// postprocessing example: NoiseEffect blend functions and opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise: blend function',
  summary:
    'What the noise does depends on how it is blended with the scene: SCREEN and ADD brighten, MULTIPLY and DARKEN dim, OVERLAY and SOFT_LIGHT give gentle film grain, DIFFERENCE inverts patches, and SRC replaces the picture with pure static. The opacity slider fades any of them.',
  section: 'Glitch',
  tags: ['NoiseEffect', 'BlendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/NoiseEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
