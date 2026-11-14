// a mipmapped render target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A mipmapped render target',
  summary:
    'createRenderTarget({ mipmap: true }) allocates a full mip chain and regenerates it after every draw into the target. The effect copies the input in with ctx.blit and reads a coarser level with textureLod, which blurs the picture in a single draw.',
  section: 'Custom Effects',
  tags: ['createRenderTarget', 'mipmap', 'textureLod', 'ctx.blit', 'EffectRenderTargetOpts'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
