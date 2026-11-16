// leafer-ui example: Line: points as objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: points as objects",
  summary:
    "points also takes [{ x, y }, ...], more readable than the flat number array and a little slower. This polyline has its first and last point dragged by a loop.",
  section: "Elements",
  tags: ['Line', 'points', 'IPointData'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Line.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
