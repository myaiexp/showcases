// leafer-ui example: Path: canvas commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: canvas commands",
  summary:
    "Beyond SVG, path strings accept canvas commands: N rect, D and X roundRect, G and F ellipse, O and P arc, U arcTo. Each is drawn on its own in turn.",
  section: "Elements",
  tags: ['Path', 'path', 'IPathString'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/PathData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
