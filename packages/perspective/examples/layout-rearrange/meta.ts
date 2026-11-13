// Perspective example: Rearranging panels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rearranging panels",
  summary:
    "restoreWorkspace() with a layout and no panels only moves the existing ones: even columns, one wide column, rows, two over one, a swap, or all stacked as tabs. saveWorkspace() reads the tree back, and an invalid layout is rejected.",
  section: "Layouts",
  tags: ["restoreWorkspace", "layout", "sizes", "tab-layout", "saveWorkspace", "getPanelNames", "validation"],
  docs: ["repo/docs/md/how_to/javascript/layout.md", "repo/docs/md/how_to/javascript/save_restore.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
