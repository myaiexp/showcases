// leafer-ui example: Line: curve as { type, value }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: curve as { type, value }",
  summary:
    "curve can be an object: { type: 'Q', value: 0.3 } picks the built-in quadratic Bezier smoothing explicitly (type 'C' needs an extension).",
  section: "Elements",
  tags: ['Line', 'curve', 'IPointsCurve'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Line.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/PathData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
