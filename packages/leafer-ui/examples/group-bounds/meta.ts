// leafer-ui example: Group: bounds follow the children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: bounds follow the children",
  summary:
    "A Group has no width or height of its own: its bounds are those of its children. The red outline is group.getBounds(), and it grows as the circle moves away.",
  section: "Group elements",
  tags: ['Group', 'getBounds', 'children'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
