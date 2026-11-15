// postprocessing example: custom preprocessor defines changed at runtime with setChanged
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: defines and setChanged',
  summary:
    'A posterize effect takes its level count and mode from the `defines` Map, whose values are shader code. Changing one means calling `setChanged()`, which makes the EffectPass rebuild and recompile its shader, so the slider can hitch. The overlay counts the recompiles.',
  section: 'Custom effects',
  tags: ['Effect', 'defines', 'setChanged', 'EffectPass', 'recompile'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
