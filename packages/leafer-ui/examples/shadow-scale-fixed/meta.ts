// leafer-ui example: Shadow: scaleFixed under zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow: scaleFixed under zoom",
  summary: "scaleFixed: \"zoom-in\" keeps the shadow at its size when the view zooms in (it still shrinks when zooming out). The left rect's shadow scales with the Group, the right one stays put. Slide the zoom.",
  section: "Appearance",
  tags: ["shadow","scaleFixed","ShadowEffect","zoom"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/shadow.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/innerShadow.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Effect.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
