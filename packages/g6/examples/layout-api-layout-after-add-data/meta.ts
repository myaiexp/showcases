// g6 example: Graph.layout: re-layout after addData and draw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.layout: re-layout after addData and draw",
  summary: "New nodes and edges are added with addData and drawn at the origin, then layout() places them. A button adds three nodes at a time to a force layout.",
  section: 'Layout',
  tags: ["layout()", "addData", "draw", "d3-force"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
