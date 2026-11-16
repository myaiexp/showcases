// leafer-ui example: EditorMoveEvent: MOVE reports the move distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorMoveEvent: MOVE reports the move distance",
  summary: "EditorMoveEvent.MOVE fires for every move step with moveX and moveY in world coordinates; BEFORE_MOVE fires first.",
  section: 'Graphic editor',
  tags: ["EditorMoveEvent", "EditorMoveEvent.MOVE", "EditorMoveEvent.BEFORE_MOVE", "moveX", "moveY"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorMoveEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
