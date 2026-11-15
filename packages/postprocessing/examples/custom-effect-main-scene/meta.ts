// postprocessing example: a custom effect that renders the scene again into its own target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: own render target and mainScene',
  summary:
    'An effect can do supporting renders. This minimap effect takes the scene through its `mainScene` setter (filled by `composer.setMainScene()`), creates a render target in `initialize()`, renders the scene from a top-down camera into it inside `update()`, and its shader pastes the result into a corner. `Effect.dispose()` frees the target.',
  section: 'Custom effects',
  tags: ['Effect', 'mainScene', 'mainCamera', 'initialize', 'update', 'WebGLRenderTarget', 'setMainScene', 'dispose'],
  docs: ['repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
