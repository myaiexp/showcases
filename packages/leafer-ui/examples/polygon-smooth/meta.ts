// leafer-ui example: Polygon: curve smooths the outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: curve smooths the outline",
  summary:
    "curve: true turns the corners of a points polygon into a smooth closed shape. The docs repeat the last corner (90, 90, 10, 90) so the join closes well.",
  section: "Elements",
  tags: ['Polygon', 'points', 'curve'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Polygon.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
