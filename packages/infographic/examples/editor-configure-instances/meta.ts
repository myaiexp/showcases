// AntV Infographic example: Editor: configuring plugins and interactions with instances
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: configuring plugins and interactions with instances",
  summary:
    "The configuration snippet on the editor page: plugins and interactions are arrays of instances, here all ten written out, with DragCanvas given its trigger. The side panel lists them by name. The card shows the same set at work: a label is selected, restyled and panned.",
  section: "Editor",
  tags: ["plugins", "interactions", "EditBar", "ResizeElement", "DragCanvas", "DblClickEditText", "BrushSelect", "ClickSelect", "DragElement", "HotkeyHistory", "ZoomWheel", "SelectHighlight"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
