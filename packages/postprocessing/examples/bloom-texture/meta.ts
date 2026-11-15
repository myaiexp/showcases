// postprocessing example: the intermediate bloom texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The bloom texture',
  summary:
    'A BloomEffect keeps its blurred result in a texture before blending it into the frame. A TextureEffect in a second EffectPass shows that glow alone; switching it off shows the finished bloom. Handy for judging threshold and blur settings.',
  section: 'Bloom',
  tags: ['BloomEffect', 'texture', 'TextureEffect', 'EffectPass'],
  docs: ['repo/README.md', 'repo/src/effects/BloomEffect.js', 'repo/src/effects/TextureEffect.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
