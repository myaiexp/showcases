// tanstack-charts example: layer paints children in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "layer paints children in order",
  summary:
    "layer resolves its children against the same bounds in paint order, so a later view covers an earlier one. Two charts fill the same frame; the select swaps which comes first, and the other is drawn over it. Each child is clipped to its frame.",
  section: "View Composition",
  tags: ["composeViews", "layer", "fill"],
  docs: ["repo/docs/reference/view-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
