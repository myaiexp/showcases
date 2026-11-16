// leafer-ui example: Path: compact path data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: compact path data",
  summary:
    "Path data is SVG plus canvas commands, and spaces are optional: 'X0 0 100 100 30M75 50P50 50 25' is a rounded square (X) and a circle (P) after a moveTo (M). Slide the radius in the string.",
  section: "Elements",
  tags: ['Path', 'path', 'windingRule', 'IPathString'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/PathData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
