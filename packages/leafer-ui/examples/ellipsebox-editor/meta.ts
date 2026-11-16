// leafer-ui example: EllipseBox: select the box, double-click in for the child
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EllipseBox: select the box, double-click in for the child",
  summary:
    "In an App with the editor, EllipseBox has hitChildren: false so a click selects the whole box, not the child under the pointer; a double-click enters the box and then selects the child. The docs' App form.",
  section: 'Official plugins',
  tags: ["EllipseBox", "App", "editor", "hitChildren", "editable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/EllipseBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
