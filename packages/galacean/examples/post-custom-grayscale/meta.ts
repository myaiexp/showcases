// galacean example: Custom post-process pass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom post-process pass",
  summary: "The docs' grayscale demo: a PostProcessPass subclass blits the previous pass's result (renderer_BlitTexture) through a grayscale material, after the built-in Uber pass has applied bloom and ACES tonemapping. The card toggles the pass.",
  section: "Post Process",
  tags: ['PostProcessPass','Blitter.blitTexture','engine.addPostProcessPass','renderer_BlitTexture'],
  docs: [
    'repo/docs/en/graphics/postProcess/customPostProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
