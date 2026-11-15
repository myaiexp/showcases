// cosmos-gl example: Positions readback minimap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Positions readback minimap",
  summary:
    "getPointPositions reads every point back from the GPU. A small 2D canvas draws them as a minimap of the running layout, with a box showing what the main view covers.",
  section: "Queries & sampling",
  tags: ["getPointPositions", "screenToSpacePosition"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
