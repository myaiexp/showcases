// postprocessing example: two scenes layered with two RenderPasses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two scenes, two RenderPasses',
  summary:
    'The first RenderPass draws the showroom; the second draws a ring from another scene into the same buffer because its clearPass is disabled. A ClearPass(depth) between them decides whether the ring intersects the showroom or always sits in front.',
  section: 'Passes',
  tags: ['RenderPass', 'clearPass', 'ClearPass', 'depth', 'EffectComposer', 'CopyPass'],
  docs: ['repo/src/passes/RenderPass.js', 'repo/src/passes/ClearPass.js', 'repo/src/passes/CopyPass.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
