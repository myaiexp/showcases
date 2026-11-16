// leafer-ui example: Path: the pen drawing chain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: the pen drawing chain",
  summary:
    "path.pen is a canvas-style pen bound to the element: path.pen.roundRect(...).drawArc(...) writes the path data in one chain. The hole radius changes in the card.",
  section: "Elements",
  tags: ['Path', 'pen', 'windingRule', 'roundRect', 'drawArc'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
