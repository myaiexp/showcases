// leafer-ui example: Paint: visible and blendMode on one fill layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paint: visible and blendMode on one fill layer",
  summary: "Every Paint object has its own visible and blendMode. A fill array stacks a solid red under a gradient whose blendMode and visible you change.",
  section: "Appearance",
  tags: ["fill","Paint","blendMode","visible","linear"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/BlendMode.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/paint/linear.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/fill.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
