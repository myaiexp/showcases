// leafer-ui example: Cursor: an image cursor with an offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cursor: an image cursor with an offset",
  summary: "cursor also takes { url, x, y }: a PNG or SVG as the pointer, with the hot spot offset by x and y. The slider moves the hot spot; hover the shape to see it (the readout names the css value).",
  section: "Interaction",
  tags: ["cursor","IImageCursor","Polygon","svg"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/cursor.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
