// leafer-ui example: EditorEvent: BEFORE_SELECT fires before the selection changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorEvent: BEFORE_SELECT fires before the selection changes",
  summary: "BEFORE_SELECT arrives first with the value about to be selected and the previous one, so the log shows each change twice: before and after.",
  section: 'Graphic editor',
  tags: ["EditorEvent", "EditorEvent.BEFORE_SELECT", "EditorEvent.SELECT", "value", "oldValue"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
