// leafer-ui example: EditorGroupEvent: OPEN and CLOSE when a group is entered
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorGroupEvent: OPEN and CLOSE when a group is entered",
  summary: "Double-clicking into a group fires BEFORE_OPEN and OPEN, and leaving it fires BEFORE_CLOSE and CLOSE; the event carries the group as editTarget.",
  section: 'Graphic editor',
  tags: ["EditorGroupEvent", "EditorGroupEvent.OPEN", "EditorGroupEvent.CLOSE", "Group"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorGroupEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
