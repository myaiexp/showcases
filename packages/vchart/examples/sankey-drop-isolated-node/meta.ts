// vchart example: Sankey: dropIsolatedNode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: dropIsolatedNode",
  summary:
    "A node in the node list that no link touches is isolated. By default it still takes a slot in the first column; dropIsolatedNode: true leaves it out of the layout. Added in VChart 1.11; the switch toggles it.",
  section: "Flow and Relation",
  tags: ["dropIsolatedNode", "nodes", "links"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
