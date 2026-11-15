// postprocessing example: HalfFloat versus 8-bit frame buffers under a bloom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame buffer precision',
  summary:
    'Two composers with the same RenderPass and BloomEffect, one with UnsignedByteType frame buffers and one with HalfFloatType. The 8-bit buffers clamp the emissive tubes to 1.0 before the bloom sees them, so the glow all but disappears; the HalfFloat buffers keep their brightness and the bloom picks it up.',
  section: 'Usage',
  tags: ['EffectComposer', 'frameBufferType', 'HalfFloatType', 'UnsignedByteType', 'BloomEffect'],
  docs: ['repo/README.md', 'repo/src/core/EffectComposer.js', 'repo/src/effects/BloomEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
