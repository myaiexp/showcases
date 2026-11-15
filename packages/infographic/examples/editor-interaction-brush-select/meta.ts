// AntV Infographic example: Editor interaction: BrushSelect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor interaction: BrushSelect",
  summary:
    "BrushSelect box-selects whatever the dragged rectangle covers on empty canvas, and Shift adds to the selection. The full view lets you drag a box over the labels. The card builds the same selection by code, adding one label after another and then clearing.",
  section: "Editor",
  tags: ["BrushSelect", "SelectHighlight", "interactions"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
