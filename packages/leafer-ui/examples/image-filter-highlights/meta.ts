// leafer-ui example: Image filter: highlights from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: highlights from -1 to 1",
  summary:
    "The highlights filter changes only the bright pixels (luminance above 0.5): positive values lift them, negative ones pull them down.",
  section: 'Official plugins',
  tags: ["ImageFilter", "filter", "image paint", "highlights"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
