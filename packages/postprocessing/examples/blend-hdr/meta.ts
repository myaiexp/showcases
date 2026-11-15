// postprocessing example: HDR-capable blend functions against clamped ones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions and HDR',
  summary:
    'A HalfFloat scene with lamps glowing at 6 is blended with a faint layer, then bloomed above luminance 1. ADD, NORMAL and MULTIPLY are marked "Supports HDR" and the lamps still bloom; LINEAR_DODGE, LINEAR_LIGHT and COLOR_DODGE clamp to 1 and the glow disappears.',
  section: 'Blending',
  tags: ['BlendFunction', 'HalfFloatType', 'frameBufferType', 'ADD', 'LINEAR_DODGE', 'BloomEffect', 'luminanceThreshold'],
  docs: ['repo/src/effects/TextureEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/BloomEffect.js', 'repo/src/core/EffectComposer.js', 'repo/src/effects/blending/glsl/add.frag', 'repo/src/effects/blending/glsl/linear-dodge.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
