// the docs' TrailEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The docs' TrailEffect",
  summary:
    'A feedback trail: the effect keeps a persistent render target, fades the last frame, shifts it and draws the picture on top, then copies the result out. outputRect pads the output by 60px so the trail can leave the picture.',
  section: 'Custom Effects',
  tags: ['createRenderTarget', 'persistent', 'outputRect', 'EffectDims', 'contentRect', 'pixelRatio', 'ctx.draw'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
