// ctx.blit and ctx.clear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ctx.blit and ctx.clear: a frozen frame',
  summary:
    'On request the effect copies the playing video into a render target with ctx.blit, then shows that frozen copy on the left of a divider and the live video on the right. ctx.clear empties the target again. Both calls are only valid inside render().',
  section: 'Custom Effects',
  tags: ['ctx.blit', 'ctx.clear', 'createRenderTarget', 'ctx.draw', 'video'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
