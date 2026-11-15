// postprocessing example: ClearPass override colour and alpha
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ClearPass: override colour and alpha',
  summary:
    'A ClearPass first in the chain clears the buffer to overrideClearColor with overrideClearAlpha, and a RenderPass with its own clear disabled draws the scene on top. The canvas has alpha over a checkerboard, so the clear alpha shows as the backdrop turning see-through.',
  section: 'Passes',
  tags: ['ClearPass', 'overrideClearColor', 'overrideClearAlpha', 'RenderPass', 'clearPass', 'CopyPass'],
  docs: ['repo/src/passes/ClearPass.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/CopyPass.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
