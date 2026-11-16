// Editor config: skipNested drops elements nested in other selected ones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: skipNested drops elements nested in other selected ones",
  summary: "Selecting a group and a rect inside it together would edit the rect twice; with skipNested the nested rect is filtered out of the selection list.",
  section: 'Graphic editor',
  tags: ["Editor", "skipNested", "Group", "list"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/select.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
