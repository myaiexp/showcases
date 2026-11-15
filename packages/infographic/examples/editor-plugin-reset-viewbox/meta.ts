// AntV Infographic example: Editor plugin: ResetViewBox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor plugin: ResetViewBox",
  summary:
    "ResetViewBox adds a button that restores the view after DragCanvas and ZoomWheel moved it. The full view has all three: Ctrl+wheel to zoom, Space and drag to pan, then press reset. The card zooms and pans the view with the same viewBox command and then restores it.",
  section: "Editor",
  tags: ["ResetViewBox", "DragCanvas", "ZoomWheel", "UpdateOptionsCommand"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
