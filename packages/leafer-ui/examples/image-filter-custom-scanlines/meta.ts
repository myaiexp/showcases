// leafer-ui example: Image filter: scanlines from the resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: scanlines from the resolution",
  summary:
    "The shader also receives the filter canvas size in pixels: this one darkens every other row of pixels, using uv.y times resolution.y, by an amount set with the value.",
  section: 'Official plugins',
  tags: ["registerImageFilter", "GLSL", "resolution", "uv"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
