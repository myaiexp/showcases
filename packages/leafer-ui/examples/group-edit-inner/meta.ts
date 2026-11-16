// leafer-ui example: Group: select a group, double-click inside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: select a group, double-click inside",
  summary:
    "In the editor a Group with hitChildren: false is selected as one unit; double-clicking enters the group so its children can be edited. The card selects the group, drags it, then double-taps to enter.",
  section: "Group elements",
  tags: ['Group', 'hitChildren', 'editable', '@leafer-in/editor'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
