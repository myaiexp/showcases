// postprocessing example: the built-in uniforms of an effect shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: built-in uniforms',
  summary:
    'Every effect shader can read `aspect`, `time`, `texelSize` and `resolution` (and `cameraNear`/`cameraFar`) without declaring them. One shader draws a round circle with aspect, moving stripes with time, a one-pixel grid with texelSize and checker squares with resolution. In 6.39 `resolution` and `texelSize` are vec2, not the manual\'s vec4.',
  section: 'Custom effects',
  tags: ['Effect', 'aspect', 'time', 'texelSize', 'resolution', 'cameraNear', 'cameraFar', 'uniforms'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/materials/EffectMaterial.js', 'repo/src/materials/glsl/effect.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
