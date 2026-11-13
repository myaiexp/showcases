// Perspective example: Datagrid edit and select modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Datagrid edit and select modes",
  summary:
    "plugin_config.edit_mode switches the grid between EDIT, which writes cell edits back to the indexed Table, and the SELECT_* modes, which emit perspective-select with filters to insert and remove.",
  section: "Datagrid",
  tags: ["edit_mode", "EDIT", "SELECT_ROW", "SELECT_REGION", "perspective-select", "PerspectiveSelectDetail", "index"],
  docs: ["repo/packages/viewer-datagrid/README.md", "repo/docs/md/how_to/javascript/events.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
