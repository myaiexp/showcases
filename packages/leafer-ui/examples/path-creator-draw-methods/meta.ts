// leafer-ui example: PathCreator: drawArc, drawEllipse and drawPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PathCreator: drawArc, drawEllipse and drawPoints",
  summary: "arc() and ellipse() join the previous point to the shape's start with a line; the new drawArc() and drawEllipse() moveTo the start first so each shape stays separate, and drawPoints(points, curve, close) draws a polyline or smooth curve. Compare the two arcs.",
  section: "Utilities",
  tags: ["PathCreator", "arc", "drawArc", "ellipse", "drawEllipse", "drawPoints"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/path/PathCreator.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
