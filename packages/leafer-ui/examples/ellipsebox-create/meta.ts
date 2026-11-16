// leafer-ui example: EllipseBox: a Box shaped as a ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EllipseBox: a Box shaped as a ring",
  summary:
    "EllipseBox (from @leafer-in/box) is a Box shaped like an Ellipse, here a ring (innerRadius 0.5). It still holds children: the orange circle is a child, positioned in the box's own coordinates, and moves with it when you drag the box.",
  section: 'Official plugins',
  tags: ["EllipseBox", "Box", "add", "draggable"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/EllipseBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
