// postprocessing example: two custom effects merged into one EffectPass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: merging effects',
  summary:
    'A warm-tint effect and a contrast effect both declare `uniform float strength` and `vec3 shade(...)`, and still share one EffectPass: the pass prefixes every uniform, function and macro name per effect (e0Strength, e1Shade, ...). The full view prints the renamed lines read from the compound shader; the sliders drive each strength.',
  section: 'Custom effects',
  tags: ['Effect', 'EffectPass', 'uniforms', 'mainImage', 'fullscreenMaterial'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/materials/EffectMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
