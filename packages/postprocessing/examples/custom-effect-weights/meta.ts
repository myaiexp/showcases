// postprocessing example: the manual's TL;DR weights effect written for v6
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: weights',
  summary:
    'A WeightsEffect extends Effect with a fragment shader and a `weights` vec3 uniform in a Map, and an EffectPass merges it. The shader is the manual\'s TL;DR rewritten for 6.39: `void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)`. The sliders scale each colour channel; cards drift the weights on their own.',
  section: 'Custom effects',
  tags: ['Effect', 'uniforms', 'Uniform', 'mainImage', 'EffectPass'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
