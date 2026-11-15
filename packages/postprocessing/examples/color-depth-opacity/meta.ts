// postprocessing example: ColorDepthEffect cross-faded with the scene through blendMode.opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Color depth: opacity',
  summary:
    'Every effect has a blendMode, and its opacity uniform mixes the effect with the untouched scene. Here a 6-bit ColorDepthEffect fades in and out, so the banding appears gradually.',
  section: 'Color Depth',
  tags: ['ColorDepthEffect', 'blendMode', 'opacity', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/effects/ColorDepthEffect.js', 'repo/src/effects/Effect.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
