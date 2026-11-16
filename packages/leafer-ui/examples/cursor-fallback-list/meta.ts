// leafer-ui example: Cursor: an array of cursors with a fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cursor: an array of cursors with a fallback",
  summary: "cursor accepts an array, like a CSS cursor list: the first that works wins and the last is the fallback. Here an image cursor is followed by \"pointer\"; the checkbox drops the image.",
  section: "Interaction",
  tags: ["cursor","ICursorType","array","IImageCursor"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/cursor.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
