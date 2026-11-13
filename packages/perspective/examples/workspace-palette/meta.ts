// Perspective example: Workspace colour palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Workspace colour palette",
  summary:
    "restoreWorkspace({ palette }) defines --psp-user-- gradients and palettes that a heatmap and a datagrid reference with var(). Switch palettes, and see saveWorkspace() write the colours back as references plus a palette map.",
  section: "Save and Restore",
  tags: ["palette", "restoreWorkspace", "saveWorkspace", "full_palette", "gradient", "Heatmap", "var()"],
  docs: ["repo/docs/md/how_to/javascript/save_restore.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
