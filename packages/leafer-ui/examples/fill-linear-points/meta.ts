// leafer-ui example: Linear gradient: percent and pixel control points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear gradient: percent and pixel control points",
  summary: "from and to also take a point: { type: \"percent\", x, y } relative to the shape, or plain { x, y } in pixels. Four sliders move the two points; the pixel box switches the form. The card orbits both points.",
  section: "Appearance",
  tags: ["fill","linear","from","to","IUnitPointData","percent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/linear.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
