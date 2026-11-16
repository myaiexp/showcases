// leafer-ui example: Image filter: the order of the array matters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: the order of the array matters",
  summary:
    "Filters run in array order. Left: exposure then contrast. Right: contrast then exposure. The two end up with different pictures from the same two values.",
  section: 'Official plugins',
  tags: ["image-filter", "filter", "exposure", "contrast"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
