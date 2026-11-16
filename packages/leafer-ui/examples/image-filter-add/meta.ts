// leafer-ui example: Image filter: seven colour filters on an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: seven colour filters on an image",
  summary:
    "The image-filter plugin adds a filter array to an image paint and runs it on the GPU: exposure, contrast, saturation, temperature, tint, highlights and shadows, each from -1 to 1. Here all seven are set at the docs' values on an editable Image.",
  section: 'Official plugins',
  tags: ["image-filter", "filter", "exposure", "contrast", "saturation", "temperature", "tint", "highlights", "shadows"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
