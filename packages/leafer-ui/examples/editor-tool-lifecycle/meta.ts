// leafer-ui example: EditTool: onCreate, onLoad, onUpdate and onUnload in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: onCreate, onLoad, onUpdate and onUnload in order",
  summary: "A tool is created once, loaded each time an element is selected, updated whenever the view or element changes and unloaded when the selection goes; the counters show how often each hook runs.",
  section: 'Graphic editor',
  tags: ["EditTool", "onCreate", "onLoad", "onUpdate", "onUnload", "registerEditTool"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
