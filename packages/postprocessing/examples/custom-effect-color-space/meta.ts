// postprocessing example: a custom effect that works in sRGB through inputColorSpace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: inputColorSpace',
  summary:
    'Effects receive linear colours by default. A custom effect can set `inputColorSpace` (marked experimental) to SRGBColorSpace, and the EffectPass wraps its shader in the conversions. The same smoothstep S-curve then lands on perceptual values: a much gentler contrast than on linear ones.',
  section: 'Custom effects',
  tags: ['Effect', 'inputColorSpace', 'outputColorSpace', 'SRGBColorSpace', 'EffectPass'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
