// leafer-ui example: Image filter: a vignette shader using uv
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: a vignette shader using uv",
  summary:
    "A custom filter can use the pixel's uv: this one darkens by the distance from the centre, so the value is the strength of a vignette.",
  section: 'Official plugins',
  tags: ["registerImageFilter", "GLSL", "uv", "vignette"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
