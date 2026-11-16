// leafer-ui example: Editor config: multipleSelectKey chooses the multi-select modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: multipleSelectKey chooses the multi-select modifier",
  summary: "multipleSelectKey is a hook that tells the editor which keys add to the selection; here Shift or Ctrl does, so a Ctrl-click and a Shift-click both extend it.",
  section: 'Graphic editor',
  tags: ["Editor", "multipleSelectKey", "IShortcutKeysCheck", "ctrlKey", "shiftKey"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
