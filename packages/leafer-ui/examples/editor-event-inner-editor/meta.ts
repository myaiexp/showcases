// leafer-ui example: InnerEditorEvent: OPEN and CLOSE around an inner editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InnerEditorEvent: OPEN and CLOSE around an inner editor",
  summary: "InnerEditorEvent fires BEFORE_OPEN and OPEN when the text inner editor opens and BEFORE_CLOSE and CLOSE when it closes; editTarget is the element and innerEditor the editor instance.",
  section: 'Graphic editor',
  tags: ["InnerEditorEvent", "InnerEditorEvent.OPEN", "InnerEditorEvent.CLOSE", "editTarget", "innerEditor"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/InnerEditorEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
