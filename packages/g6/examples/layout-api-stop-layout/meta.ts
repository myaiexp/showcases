// g6 example: Graph.stopLayout: halt an iterative layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.stopLayout: halt an iterative layout",
  summary: "A d3-force layout is animated tick by tick; stopLayout freezes it where it is. Buttons stop it mid-run and run it again.",
  section: 'Layout',
  tags: ["stopLayout", "layout()", "d3-force"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
    "repo/packages/site/docs/manual/layout/D3ForceLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
