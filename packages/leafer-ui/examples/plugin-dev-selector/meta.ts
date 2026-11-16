// leafer-ui example: Plugin: a Selector built on Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plugin: a Selector built on Group",
  summary: "A plugin is a class that extends Group (the docs import it from @leafer-ui/core) and uses the public API. This Selector draws a rubber band on drag, hit-tests the targets with Bounds and emits its own selector.select event.",
  section: "Utilities",
  tags: ["Plugin", "Group", "Bounds", "DragEvent", "custom event"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/dev.md", "pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
