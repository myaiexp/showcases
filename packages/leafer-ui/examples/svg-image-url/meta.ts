// leafer-ui example: SVG: Image with an SVG url
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: Image with an SVG url",
  summary:
    "An Image or pattern fill accepts an SVG url and renders it through the SVG pipeline, so scaling never loses sharpness; the cursor arrow here is a data: URL drawn as SVG.",
  section: "Elements",
  tags: ['Image', 'url', 'SVG', 'width'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/SVG.md',
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
