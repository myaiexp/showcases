// AntV Infographic example: Editor interaction: ZoomWheel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: ZoomWheel",
  summary:
    "ZoomWheel zooms the drawing: Ctrl/Cmd plus the wheel zooms at the pointer, Shift plus the wheel zooms at the centre. The full view reacts to the wheel. The card zooms the viewBox in and out with the same viewBox command and returns to the start.",
  section: "Editor",
  tags: ["ZoomWheel", "UpdateOptionsCommand", "interactions"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
