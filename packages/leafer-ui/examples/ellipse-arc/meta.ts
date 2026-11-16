// leafer-ui example: Ellipse: rounded arc with closed: false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ellipse: rounded arc with closed: false",
  summary:
    "closed: false turns the sector into an open arc that only strokes the curve; strokeCap: 'round' gives it rounded ends, like a progress ring.",
  section: "Elements",
  tags: ['Ellipse', 'closed', 'strokeCap', 'strokeWidth', 'stroke'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Ellipse.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
