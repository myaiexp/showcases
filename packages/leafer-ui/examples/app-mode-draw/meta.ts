// leafer-ui example: App mode: draw to create rects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "App mode: draw to create rects",
  summary:
    "app.mode switches how the App treats input: \"normal\" edits, \"preview\" disables the editor but elements still react, \"draw\" disables both so drags go to your own DragEvent listeners. In draw mode here a drag makes a rect from e.getPageBounds().",
  section: "App & Engine",
  tags: ['App', 'mode', 'DragEvent', 'getPageBounds', 'on_', 'off_', 'Editor', '@leafer-in/editor'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/display/App.md', 'pages/www-leaferjs-com/ui/en/guide/advanced/bounds.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
