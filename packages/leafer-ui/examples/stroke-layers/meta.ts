// leafer-ui example: Stroke: three layered strokes from sub-styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke: three layered strokes from sub-styles",
  summary: "Several solid paints with their own style.strokeWidth stack into a multi-layer border: blue 10, black 5 and white at the stroke's own width. The slider changes the base strokeWidth.",
  section: "Appearance",
  tags: ["stroke","style","IStrokeStyle","strokeWidth"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/stroke.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
