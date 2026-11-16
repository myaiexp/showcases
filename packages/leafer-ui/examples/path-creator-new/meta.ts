// leafer-ui example: PathCreator: draw a new path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PathCreator: draw a new path",
  summary: "new PathCreator() collects numeric path data from canvas-style calls; moveTo, bezierCurveTo and quadraticCurveTo chain. The .path result becomes the path of a Path element, here a heart on a rounded gradient tile.",
  section: "Utilities",
  tags: ["PathCreator", "moveTo", "bezierCurveTo", "quadraticCurveTo", "path"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/path/PathCreator.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
