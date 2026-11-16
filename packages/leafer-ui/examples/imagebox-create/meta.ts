// leafer-ui example: ImageBox: a Box that shows a picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ImageBox: a Box that shows a picture",
  summary:
    "ImageBox (from @leafer-in/box) is a Box whose url paints an image over its whole area. It still holds children: the orange circle is a child, positioned in the box's own coordinates, and moves with it when you drag the box.",
  section: 'Official plugins',
  tags: ["ImageBox", "Box", "add", "draggable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/ImageBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
