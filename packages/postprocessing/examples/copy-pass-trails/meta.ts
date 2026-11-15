// postprocessing example: CopyPass feedback trails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CopyPass: feedback trails',
  summary:
    'A CopyPass stores the finished frame in a texture, and a TextureEffect earlier in the chain blends that texture into the next frame. The blend opacity is how much of the past survives, so moving objects leave fading trails.',
  section: 'Passes',
  tags: ['CopyPass', 'texture', 'TextureEffect', 'BlendFunction', 'opacity', 'frameBufferType'],
  docs: ['repo/README.md', 'repo/src/passes/CopyPass.js', 'repo/src/effects/TextureEffect.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
