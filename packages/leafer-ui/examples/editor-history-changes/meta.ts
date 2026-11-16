// leafer-ui example: Editor history: PropertyEvent and ChildEvent on the tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor history: PropertyEvent and ChildEvent on the tree",
  summary: "A drag changes several properties at once; the docs suggest listening on app.tree for PropertyEvent.CHANGE (and ChildEvent for added or removed elements) to collect the changes, which this log does while you edit.",
  section: 'Graphic editor',
  tags: ["Editor", "PropertyEvent.CHANGE", "ChildEvent.ADD", "ChildEvent.REMOVE", "history"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/history.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
