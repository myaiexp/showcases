// AntV Infographic example: Editor interaction: DragElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: DragElement",
  summary:
    "DragElement moves the selected element when you drag it, snapping to guides unless Alt is held. Drag a label in the full view. The card moves a label with the same UpdateElementCommand a drag ends in, sliding it out and back.",
  section: "Editor",
  tags: ["DragElement", "ClickSelect", "UpdateElementCommand", "interactions"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
