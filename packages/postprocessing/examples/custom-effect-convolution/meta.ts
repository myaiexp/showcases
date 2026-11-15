// postprocessing example: a custom convolution effect that sharpens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: convolution',
  summary:
    'A sharpen effect reads the four neighbours of each pixel with `texture2D(inputBuffer, uv + texelSize...)` and marks itself EffectAttribute.CONVOLUTION, which tells the EffectPass it samples the input away from the current uv. The slider mixes between the original and the sharpened picture.',
  section: 'Custom effects',
  tags: ['Effect', 'EffectAttribute', 'CONVOLUTION', 'inputBuffer', 'texelSize', 'mainImage'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/EffectAttribute.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
