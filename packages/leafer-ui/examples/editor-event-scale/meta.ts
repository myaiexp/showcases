// leafer-ui example: EditorScaleEvent: SCALE reports scaleX, scaleY and the origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorScaleEvent: SCALE reports scaleX, scaleY and the origin",
  summary: "EditorScaleEvent.SCALE fires for every resize step with the incremental scaleX and scaleY and the world origin; editor.editBox.dragPoint names the handle in use.",
  section: 'Graphic editor',
  tags: ["EditorScaleEvent", "EditorScaleEvent.SCALE", "scaleX", "scaleY", "worldOrigin", "dragPoint"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorScaleEvent.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/EditBox.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
