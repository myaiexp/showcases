// playcanvas example: Batching and draw calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Batching and draw calls',
  summary:
    "A mesh instance is a draw call, so a hundred separate boxes cost a hundred. Batch groups, added with app.batcher.addGroup and assigned through a render component's batchGroupId, merge meshes that share a material into a few draw calls; a dynamic group still lets them move. Switch between no batching, a static batch (baked, so it stops animating) and a dynamic batch, and read the draw call count from app.stats. Giving every box its own material breaks the rule that batches need one material, and the count climbs back.",
  section: 'Debugging and Optimization',
  tags: ['BatchManager', 'batcher.addGroup', 'batchGroupId', 'drawCallCount', 'dynamic', 'RenderComponent'],
  docs: ['repo/docs/user-manual/optimization/guidelines.md', 'repo/docs/user-manual/graphics/advanced-rendering/batching.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
