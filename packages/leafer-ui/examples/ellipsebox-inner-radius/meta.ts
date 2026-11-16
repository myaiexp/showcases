// leafer-ui example: EllipseBox: innerRadius makes it a ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EllipseBox: innerRadius makes it a ring",
  summary:
    "EllipseBox takes the Ellipse path attributes: innerRadius from 0 to 1 hollows the middle out. The child circle sits in the box and is not clipped by the hole.",
  section: 'Official plugins',
  tags: ["EllipseBox", "innerRadius", "Box"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/EllipseBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
