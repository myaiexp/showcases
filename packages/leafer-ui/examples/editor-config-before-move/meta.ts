// leafer-ui example: Editor config: beforeMove changes or cancels a move
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeMove changes or cancels a move",
  summary: "beforeMove gets { target, x, y } and returns { x, y } to alter the movement: here y is zeroed, so the rect only slides sideways.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeMove", "move"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorMoveEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
