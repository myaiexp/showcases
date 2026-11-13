// Perspective example: A grid dashboard in one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A grid dashboard in one call",
  summary:
    "One restoreWorkspace() call defines three panels over one table (a bar chart, a treemap and a pivot grid) and a layout tree that puts two side by side above the third.",
  section: "Layouts",
  tags: ["restoreWorkspace", "panels", "layout", "split-layout", "tab-layout", "title", "global_filters"],
  docs: ["repo/docs/md/how_to/javascript/layout.md", "repo/docs/md/how_to/javascript/save_restore.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
