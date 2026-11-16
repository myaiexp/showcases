// leafer-ui example: Image filter: filtered and unfiltered side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: filtered and unfiltered side by side",
  summary:
    "Two Images use the same picture; only the left fill has a filter array. The shared source stays untouched, because each element gets its own filtered copy.",
  section: 'Official plugins',
  tags: ["image-filter", "filter", "fill", "image paint"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
