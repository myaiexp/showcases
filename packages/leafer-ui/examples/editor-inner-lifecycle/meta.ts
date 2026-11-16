// leafer-ui example: InnerEditor: onCreate, onLoad, onUpdate and onUnload
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InnerEditor: onCreate, onLoad, onUpdate and onUnload",
  summary: "An inner editor is created once, loaded each time it is opened by a double-click, updated as the view or element changes and unloaded when it is left; the counters show the hooks as they run. This one has no UI, so click outside to leave it.",
  section: 'Graphic editor',
  tags: ["InnerEditor", "onCreate", "onLoad", "onUpdate", "onUnload", "registerInnerEditor"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/InnerEditor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
