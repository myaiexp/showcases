// leafer-ui example: Linker: create a connector by dragging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linker: create a connector by dragging",
  summary:
    "Dragging from a violet dot creates a Linker at drag start and moves its end point with createEndPoint() to the element under the pointer: it snaps to that element, or follows the pointer in empty space.",
  section: "Official plugins",
  tags: ["Linker", "@leafer-in/linker", "createEndPoint", "DragEvent", "pick"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/linker.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
