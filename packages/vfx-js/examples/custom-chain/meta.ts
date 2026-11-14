// a chain of two custom effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chaining two custom effects',
  summary:
    'The docs\' WaveEffect and TrailEffect as an array: each effect reads the one before it as ctx.src. The trail pads its output, so the order matters, and both shaders map element uv into src with srcRectUv. updateEffects swaps the order live.',
  section: 'Custom Effects',
  tags: ['effect array', 'chain', 'srcRectUv', 'outputRect', 'dims.srcRect', 'vfx.updateEffects'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
