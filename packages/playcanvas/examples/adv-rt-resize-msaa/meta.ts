// playcanvas example: Render target resize and MSAA
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render target resize and MSAA',
  summary:
    'renderTarget.resize(width, height) changes the resolution of an existing target without recreating its texture, and the samples option adds hardware multisampling that resolves into the texture you sample. The card sweeps the resolution; the full view sets width, samples (a new target) and the texture filter, so stair-stepping on the thin bars is easy to compare.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'resize', 'samples', 'FILTER_NEAREST', 'Texture', 'colorBuffer'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
