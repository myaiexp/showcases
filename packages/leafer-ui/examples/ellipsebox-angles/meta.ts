// leafer-ui example: EllipseBox: startAngle and endAngle cut a sector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EllipseBox: startAngle and endAngle cut a sector",
  summary:
    "The Ellipse arc attributes work on the box too: startAngle and endAngle (degrees) cut a pie slice, with innerRadius it becomes a ring segment, and the child stays where it is.",
  section: 'Official plugins',
  tags: ["EllipseBox", "startAngle", "endAngle", "innerRadius"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/EllipseBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
