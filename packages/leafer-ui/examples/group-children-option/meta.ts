// leafer-ui example: Group: children option and nesting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: children option and nesting",
  summary:
    "new Group({ children: [...] }) takes its children in the constructor, and a group can hold another group, so the inner pair turns with its own rotation inside the outer one.",
  section: "Group elements",
  tags: ['Group', 'children', 'rotation'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
