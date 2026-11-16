// leafer-ui example: Group: add() child elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: add() child elements",
  summary:
    "A Group combines children without painting anything itself: group.add([rect, ellipse]) puts both under it, positioned relative to the group, so moving or rotating the group moves the pair. The card rotates it.",
  section: "Group elements",
  tags: ['Group', 'add', 'children', 'x', 'y', 'rotation'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
