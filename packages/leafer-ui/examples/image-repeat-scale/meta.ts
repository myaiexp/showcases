// leafer-ui example: Image paint: repeat mode with scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image paint: repeat mode with scale",
  summary: "repeat tiles the picture; scale sets the tile size (the docs use 0.2). One slider scales both axes, the other stretches y, since scale also takes a point.",
  section: "Appearance",
  tags: ["image","repeat","scale","IPointData"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/image.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
