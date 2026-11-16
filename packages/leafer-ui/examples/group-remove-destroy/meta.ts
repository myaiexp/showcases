// leafer-ui example: Group: remove, destroy and clear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: remove, destroy and clear",
  summary:
    "remove(child, true) removes and destroys one child, child.remove() only detaches it, and clear() destroys every child. The caption shows the children count.",
  section: "Group elements",
  tags: ['Group', 'remove', 'destroy', 'clear', 'children'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Group.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
