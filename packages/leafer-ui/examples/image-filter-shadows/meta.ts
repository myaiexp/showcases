// leafer-ui example: Image filter: shadows from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: shadows from -1 to 1",
  summary:
    "The shadows filter works on the dark pixels (luminance below 0.5): positive values brighten them, negative values crush them.",
  section: 'Official plugins',
  tags: ["ImageFilter", "filter", "image paint", "shadows"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
