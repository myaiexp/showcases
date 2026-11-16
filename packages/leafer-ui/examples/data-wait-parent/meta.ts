// leafer-ui example: Data: waitParent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: waitParent",
  summary:
    "waitParent(fn) runs fn as soon as the element has a parent, or at once if it already has one. The rect stays dim and undraggable until it is added to a group.",
  section: "Data",
  tags: ["waitParent","parent","draggable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/parent.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
