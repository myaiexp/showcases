// leafer-ui example: PolygonBox: points and curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PolygonBox: points and curve",
  summary:
    "PolygonBox accepts the Polygon points list instead of sides, and curve smooths the corners into a closed curve: false is straight edges, true smooths them, a number sets the tension.",
  section: 'Official plugins',
  tags: ["PolygonBox", "points", "curve"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/box.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/box/PolygonBox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
