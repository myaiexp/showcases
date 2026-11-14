// g6 example: CompactBox layout: the algorithm tree with collapse and expand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "CompactBox layout: the algorithm tree with collapse and expand",
  summary: "The docs' compact-box example on the algorithm-category tree, with cubic edges, ports and the collapse-expand behavior. Each collapse or expand re-runs the layout; the card collapses and expands one branch by itself.",
  section: 'Layout',
  tags: ["compact-box", "treeToGraphData", "collapse-expand", "cubic-horizontal", "ports"],
  docs: [
    "repo/packages/site/docs/manual/layout/CompactBoxLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
