// postprocessing example: a custom effect that reads depth at neighbouring pixels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effect: readDepth at other coordinates',
  summary:
    'Besides the `depth` parameter for the current pixel, an effect shader can call the predefined `readDepth(uv)` anywhere. This one compares view distances at four neighbours, offset by the `texelSize` uniform, and draws a line wherever the depth jumps. The slider scales how large a jump counts.',
  section: 'Custom effects',
  tags: ['Effect', 'EffectAttribute', 'DEPTH', 'readDepth', 'getViewZ', 'texelSize'],
  docs: ['repo/README.md', 'repo/manual/content/custom-effects.en.md', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/enums/EffectAttribute.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
