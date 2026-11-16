// leafer-ui example: Image paint: repeat scaleFixed under zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image paint: repeat scaleFixed under zoom",
  summary: "scaleFixed keeps a repeating pattern at the same size while the canvas zooms: true always, \"zoom-in\" only when zooming in. The Group zooms; pick which tile behaviour the rect uses.",
  section: "Appearance",
  tags: ["image","repeat","scaleFixed","zoom"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/image.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
