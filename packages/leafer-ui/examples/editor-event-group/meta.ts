// leafer-ui example: EditorGroupEvent: GROUP and UNGROUP with their before events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorGroupEvent: GROUP and UNGROUP with their before events",
  summary: "EditorGroupEvent fires BEFORE_GROUP and GROUP around editor.group(), and BEFORE_UNGROUP and UNGROUP around ungroup(); editTarget is the group.",
  section: 'Graphic editor',
  tags: ["EditorGroupEvent", "EditorGroupEvent.GROUP", "EditorGroupEvent.UNGROUP", "editTarget"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorGroupEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
