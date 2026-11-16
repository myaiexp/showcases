// Editor config: hideOnSmall hides the handles of small elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: hideOnSmall hides the handles of small elements",
  summary: "Handles are hidden when the element is smaller than the threshold (10 px by default, or the number you set); here a 30 px rect crosses a 10, 40 and 60 threshold.",
  section: 'Graphic editor',
  tags: ["Editor", "hideOnSmall", "editBox"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/base.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
