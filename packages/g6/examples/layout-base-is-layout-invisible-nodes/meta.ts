// g6 example: Layout option isLayoutInvisibleNodes: gaps for hidden nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout option isLayoutInvisibleNodes: gaps for hidden nodes",
  summary: "With preLayout on, hidden nodes are normally skipped, so the visible ones close ranks on the circle. isLayoutInvisibleNodes keeps hidden nodes in the calculation and leaves gaps for them.",
  section: 'Layout',
  tags: ["layout.isLayoutInvisibleNodes", "layout.preLayout", "visibility", "circular"],
  docs: [
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
