// leafer-ui example: Editor config: beforeScale limits the minimum size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeScale limits the minimum size",
  summary: "beforeScale gets { target, scaleX, scaleY } and may return a different scale: this one stops the rect from shrinking under 20 px, and the second form also lets it flip past zero.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeScale", "lockRatio", "flipable"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorScaleEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
