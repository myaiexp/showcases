// postprocessing example: a custom effect that implements mainUv to distort the picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: mainUv',
  summary:
    'An effect whose shader defines only `void mainUv(inout vec2 uv)` bends the coordinates the pass reads the frame with, so the picture ripples. The built-in `time` uniform animates it; the sliders change the `amplitude` and `frequency` uniforms.',
  section: 'Custom effects',
  tags: ['Effect', 'mainUv', 'time', 'uniforms', 'EffectPass'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
