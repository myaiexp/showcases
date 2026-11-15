// postprocessing example: the blend function and opacity of a custom effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: blend function',
  summary:
    'The shader of this effect just writes striped colours; the EffectPass mixes them with the colour from before using the effect\'s `blendMode`. Pass a `blendFunction` to the Effect constructor, or change `blendMode.blendFunction` and `blendMode.opacity` later. SKIP still runs the effect but draws nothing.',
  section: 'Custom effects',
  tags: ['Effect', 'blendFunction', 'BlendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
