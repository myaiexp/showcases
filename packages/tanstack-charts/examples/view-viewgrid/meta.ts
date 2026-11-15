// tanstack-charts example: viewGrid shorthand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "viewGrid shorthand",
  summary:
    "viewGrid is the same composition written as a list of views, each naming its row, column and optional share or align links. A histogram above a line chart share x through share: { x: 'main' } on the top view, with no separate links array.",
  section: "View Composition",
  tags: ["viewGrid", "share", "align"],
  docs: ['repo/docs/reference/view-composition.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
