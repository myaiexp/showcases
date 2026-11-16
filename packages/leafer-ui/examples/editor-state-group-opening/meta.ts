// leafer-ui example: Editor: groupOpening is true while a group is open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: groupOpening is true while a group is open",
  summary: "Click a group, then double-click a rect inside it: the group opens, groupOpening becomes true and the rect is selected alone; clicking outside closes it.",
  section: 'Graphic editor',
  tags: ["Editor","groupOpening","Group","hitChildren","doubleTap"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/state.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
