// zephyr3d example: Where a render module sits: before or after sky and fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Where a render module sits: before or after sky and fog",
  summary:
    "The same outline module placed with insertAfter(LightPass), insertAfter(SkyPass), append and prepend. Height fog is composited by SkyPass, so an outline placed before it fades into the fog and one after it stays crisp.",
  section: "Advanced Topics",
  tags: ['RenderPipeline', 'insertAfter', 'append', 'prepend', 'ForwardPlusModules', 'SkyPass', 'LightPass', 'fogType'],
  docs: ['repo/apps/doc/web/en/rendergraph.md', 'repo/apps/doc/src/tut-70/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
