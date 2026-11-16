// leafer-ui example: Stroke: strokeScaleFixed under zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke: strokeScaleFixed under zoom",
  summary: "strokeScaleFixed keeps the line width while the view zooms: true always, \"zoom-in\" only when zooming in, a number below 1 from that zoom level down. Four equal rects sit in a zooming Group.",
  section: "Appearance",
  tags: ["stroke","strokeScaleFixed","strokeWidth","zoom"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/stroke.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
