// leafer-ui example: Editor config: hideRotatePoints removes the rotate hot spots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: hideRotatePoints removes the rotate hot spots",
  summary: "Dragging just outside a corner handle rotates the element; hideRotatePoints removes those hot spots, so the same drag no longer rotates.",
  section: 'Graphic editor',
  tags: ["Editor", "hideRotatePoints", "rotateable"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/base.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
