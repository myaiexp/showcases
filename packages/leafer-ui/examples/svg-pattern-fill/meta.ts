// leafer-ui example: SVG: pattern fill from a string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: pattern fill from a string",
  summary:
    "The same SVG string can fill any shape: fill: { type: 'image', url: Platform.toURL(svg, 'svg'), mode: 'stretch' } on a Rect. The Rect stretches the vector badge.",
  section: "Elements",
  tags: ['Rect', 'fill', 'Platform', 'toURL', 'ImagePaint'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/SVG.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
