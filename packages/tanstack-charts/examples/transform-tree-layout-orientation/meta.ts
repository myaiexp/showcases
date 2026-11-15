// tanstack-charts example: treeLayout orientation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "treeLayout orientation",
  summary:
    "treeLayout turns dotted paths into positioned nodes and links, with the root anchored on the side that orientation names. The select cycles through left, right, top and bottom; positions are semantic units that a linear scale projects, and an ancestor missing from the data is imputed.",
  section: "Data Transforms",
  tags: ["treeLayout", "orientation", "link", "dot", "text"],
  docs: [
    'repo/docs/reference/transforms.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/reference/marks/text-frame-and-facet.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
