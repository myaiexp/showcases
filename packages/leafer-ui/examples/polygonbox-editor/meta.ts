// leafer-ui example: PolygonBox: select the box, double-click in for the child
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PolygonBox: select the box, double-click in for the child",
  summary:
    "In an App with the editor, PolygonBox has hitChildren: false so a click selects the whole box, not the child under the pointer; a double-click enters the box and then selects the child. The docs' App form.",
  section: 'Official plugins',
  tags: ["PolygonBox", "App", "editor", "hitChildren", "editable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/PolygonBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
