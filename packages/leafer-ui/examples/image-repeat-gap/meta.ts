// leafer-ui example: Image paint: repeat with gap, auto and fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image paint: repeat with gap, auto and fit",
  summary: "gap spaces the tiles: a number, { x, y }, \"auto\" (spread the leftover space, never negative) or \"fit\" (spread it, allowing overlap). The select cycles the forms.",
  section: "Appearance",
  tags: ["image","repeat","gap","IGap","IPointGap"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/image.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
