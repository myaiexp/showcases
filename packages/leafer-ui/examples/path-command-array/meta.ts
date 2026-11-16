// leafer-ui example: Path: numeric command array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: numeric command array",
  summary:
    "IPathCommandData is a flat number array: [1, 0, 0, 2, 100, 100, 2, 0, 100, 11] is M 0 0 L 100 100 L 0 100 Z (1 = M, 2 = L, 11 = Z). The slider moves the apex.",
  section: "Elements",
  tags: ['Path', 'path', 'IPathCommandData'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/IPathCommandData.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/PathData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
