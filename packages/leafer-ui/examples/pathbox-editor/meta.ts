// leafer-ui example: PathBox: select the box, double-click in for the child
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PathBox: select the box, double-click in for the child",
  summary:
    "In an App with the editor, PathBox has hitChildren: false so a click selects the whole box, not the child under the pointer; a double-click enters the box and then selects the child. The docs' App form.",
  section: 'Official plugins',
  tags: ["PathBox", "App", "editor", "hitChildren", "editable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/PathBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
