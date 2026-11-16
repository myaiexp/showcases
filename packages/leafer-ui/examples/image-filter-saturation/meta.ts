// leafer-ui example: Image filter: saturation from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: saturation from -1 to 1",
  summary:
    "The saturation filter blends each pixel with its grey value: -1 gives black and white, positive values intensify the colour.",
  section: 'Official plugins',
  tags: ["ImageFilter", "filter", "image paint", "saturation"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
