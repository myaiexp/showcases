// zephyr3d example: Editing a pipeline: remove built-in modules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editing a pipeline: remove built-in modules",
  summary:
    "A camera gets its own createForwardPlusPipeline() and drops ForwardPlusModules.ShadowMaps, SkyPass or HiZ with remove(). The readout lists every built-in module with its type and pipeline.has(type). The shared default pipeline is never touched.",
  section: "Advanced Topics",
  tags: ['RenderPipeline', 'createForwardPlusPipeline', 'ForwardPlusModules', 'remove', 'has', 'renderPipeline'],
  docs: ['repo/apps/doc/web/en/rendergraph.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
