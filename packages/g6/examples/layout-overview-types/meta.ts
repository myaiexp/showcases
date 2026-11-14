// g6 example: Layout types: one graph, many layouts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout types: one graph, many layouts",
  summary: "A select swaps the layout type on the same 20-node graph, from circular and grid through concentric, radial, mds, fruchterman and dagre. setLayout changes the type and layout() runs it.",
  section: 'Layout',
  tags: ["layout.type", "setLayout", "layout()"],
  docs: [
    "repo/packages/site/docs/manual/layout/overview.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
