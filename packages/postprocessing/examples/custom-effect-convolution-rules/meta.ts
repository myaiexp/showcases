// postprocessing example: which custom effects an EffectPass refuses to merge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: convolution rules',
  summary:
    'A convolution effect cannot share an EffectPass with another convolution effect or with an effect that has mainUv. In 6.39 the pass throws an Error from recompile() rather than just warning (the full view prints the real messages), so such effects get a pass each, as in the render here.',
  section: 'Custom effects',
  tags: ['EffectPass', 'recompile', 'EffectAttribute', 'CONVOLUTION', 'mainUv'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/EffectAttribute.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
