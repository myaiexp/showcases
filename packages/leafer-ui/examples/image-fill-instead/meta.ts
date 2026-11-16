// leafer-ui example: Image: fill instead of url
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: fill instead of url",
  summary:
    "Any shape can show a picture through fill: { type: 'image', url, mode: 'stretch' }, here on a Rect. The Rect sets its own size, so the picture stretches with it.",
  section: "Elements",
  tags: ['Rect', 'fill', 'ImagePaint', 'url', 'mode'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
    'pages/www-leaferjs-com/ui/en/reference/interface/ui/Paint.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
