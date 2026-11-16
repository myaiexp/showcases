// leafer-ui example: Group: the editor resizes a group's children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: the editor resizes a group's children",
  summary:
    "Dragging a corner handle of a selected Group in the editor resizes the group box and scales every child with it. (The docs list a resizeChildren flag for Group; in 2.3.4 only Box and Frame carry it, and a Group always scales its children.)",
  section: "Group elements",
  tags: ['Group', 'editable', 'hitChildren', '@leafer-in/editor'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
