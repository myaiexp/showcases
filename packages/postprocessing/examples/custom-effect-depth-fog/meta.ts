// postprocessing example: a custom DEPTH effect that adds distance fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: depth and fog',
  summary:
    'Giving an effect EffectAttribute.DEPTH makes the EffectPass bind a depth texture and pass a `depth` value as a third mainImage parameter. The shader turns it into a distance with the predefined `getViewZ()` and mixes in fog; the sky becomes pure fog colour. The slider sets the fog density.',
  section: 'Custom effects',
  tags: ['Effect', 'EffectAttribute', 'DEPTH', 'getViewZ', 'mainImage', 'uniforms'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/EffectAttribute.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
