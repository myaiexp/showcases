// postprocessing example: a custom effect overriding update to animate a uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: update()',
  summary:
    'The EffectPass calls `update(renderer, inputBuffer, deltaTime)` on every effect before it renders. This heartbeat effect advances its own beat counter there and writes a pulse into a uniform, so its speed is independent of the built-in `time`. With blend SKIP it draws nothing but keeps counting.',
  section: 'Custom effects',
  tags: ['Effect', 'update', 'deltaTime', 'uniforms', 'blendMode', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
