// leafer-ui example: Box: resizeChildren in the editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box: resizeChildren in the editor",
  summary:
    "A Box leaves resizeChildren off by default: resizing it in the editor changes only the box. With resizeChildren: true the children, and Text via resizeFontSize, scale with it.",
  section: "Group elements",
  tags: ['Box', 'resizeChildren', 'editable', 'resizeFontSize'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Box.md',
    'pages/www-leaferjs-com/ui/en/reference/display/Text.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
