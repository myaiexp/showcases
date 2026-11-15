// postprocessing example: a custom effect with a vertex shader and a varying
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: vertex shader and varyings',
  summary:
    'An effect can bring a `vertexShader` with `void mainSupport(const in vec2 uv)`. This one writes a rotating two-colour gradient into a varying there, and the fragment shader reads the interpolated value to tint the scene. The vertex shader also reads the built-in `time` uniform.',
  section: 'Custom effects',
  tags: ['Effect', 'vertexShader', 'mainSupport', 'varying', 'time', 'uniforms'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/materials/glsl/effect.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
