// leafer-ui example: Stroke: marching ants with a sub-stroke style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke: marching ants with a sub-stroke style",
  summary: "In a stroke array each paint can carry a style that overrides the stroke settings. A white solid under a black solid with style.dashPattern gives a marching-ants outline; its dashOffset runs.",
  section: "Appearance",
  tags: ["stroke","style","IStrokeStyle","dashPattern","dashOffset"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/stroke.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/solid.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
