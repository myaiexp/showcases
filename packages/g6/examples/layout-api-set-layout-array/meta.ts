// g6 example: Graph.setLayout: a combined layout from an array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph.setLayout: a combined layout from an array",
  summary: "setLayout with two entries lays out the main nodes in a one-row grid and the sub nodes on a circle, each picking its nodes with nodeFilter. A button swaps which group goes where.",
  section: 'Layout',
  tags: ["setLayout", "nodeFilter", "grid", "circular", "LayoutOptions"],
  docs: [
    "repo/packages/site/docs/api/layout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
