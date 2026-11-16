// leafer-ui example: Image: Rect with layered fills
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: Rect with layered fills",
  summary:
    "Unlike Image, a Rect can layer several fills: the picture first, then a translucent colour and a gradient over it. cornerRadius and stroke work as on any Rect.",
  section: "Elements",
  tags: ['Rect', 'fill', 'ImagePaint', 'Paint[]'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
