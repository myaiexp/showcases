// leafer-ui example: Frame: resizeChildren in the editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Frame: resizeChildren in the editor",
  summary:
    "Frame.resizeChildren defaults to false: resizing a selected Frame in the editor changes the artboard and leaves its children alone; with true they scale with it.",
  section: "Group elements",
  tags: ['Frame', 'resizeChildren', 'editable', '@leafer-in/editor'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Frame.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
