// Editor config: rectThrough lets clicks pass through the edit box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: rectThrough lets clicks pass through the edit box",
  summary: "By default pointer events pass through the edit box of a single selection, so the small orange rect on top can still be clicked; rectThrough false makes the frame catch them and keeps the big rect selected.",
  section: 'Graphic editor',
  tags: ["Editor", "rectThrough", "editBox"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/style.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
