// leafer-ui example: Path: command objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: command objects",
  summary:
    "IPathCommandObject writes each command as { name: 'M' | 'L' | 'C' | 'Q' | 'Z', x, y, ... }: readable and easy to edit, slightly slower. A cubic control point swings in the card.",
  section: "Elements",
  tags: ['Path', 'path', 'IPathCommandObject'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/PathData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
