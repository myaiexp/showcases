// g6 example: Layout option nodeFilter: leave some nodes out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout option nodeFilter: leave some nodes out",
  summary: "Only nodes that pass nodeFilter join the layout. Pinned nodes in a top row keep their own x and y while the filtered-in group is arranged on a circle. A toggle turns the filter off.",
  section: 'Layout',
  tags: ["layout.nodeFilter", "circular", "setLayout"],
  docs: [
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
