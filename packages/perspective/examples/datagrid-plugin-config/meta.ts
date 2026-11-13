// Perspective example: Datagrid plugin config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Datagrid plugin config",
  summary:
    "The Datagrid plugin_config keys: zebra_rows and zebra_color, row_height, font_size, font_family, bold, italic, align and word_wrap, applied through restore().",
  section: "Datagrid",
  tags: ["plugin_config", "zebra_rows", "row_height", "font_size", "align", "word_wrap", "column_size_override"],
  docs: ["repo/packages/viewer-datagrid/README.md", "repo/docs/md/how_to/javascript/save_restore.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
