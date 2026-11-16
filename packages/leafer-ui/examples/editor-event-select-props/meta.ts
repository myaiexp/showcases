// leafer-ui example: EditorEvent: value, oldValue, list and oldList
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorEvent: value, oldValue, list and oldList",
  summary: "A select event carries the new selection (value, list) and the previous one (oldValue, oldList); list and oldList are always arrays, empty when nothing was selected.",
  section: 'Graphic editor',
  tags: ["EditorEvent", "value", "oldValue", "list", "oldList"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
