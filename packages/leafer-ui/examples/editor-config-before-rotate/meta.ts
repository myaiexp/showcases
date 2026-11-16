// leafer-ui example: Editor config: beforeRotate changes the rotation amount
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeRotate changes the rotation amount",
  summary: "beforeRotate gets { target, origin, rotation } and returns a new angle (or false to cancel): this one divides it by three, so the rect turns slowly under the pointer.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeRotate", "rotateOf"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorRotateEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
