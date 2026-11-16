// leafer-ui example: Line: closed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: closed",
  summary:
    "closed: true joins the last point back to the first, so the polyline becomes an outline; it stays a Line, not a Polygon.",
  section: "Elements",
  tags: ['Line', 'closed', 'points'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Line.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
