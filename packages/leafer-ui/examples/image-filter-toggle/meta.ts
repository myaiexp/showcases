// leafer-ui example: Image filter: switch the filter on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: switch the filter on and off",
  summary:
    "Assigning a fill without a filter array drops the filtered copy; assigning one with it makes a new copy on the GPU. The checkbox flips between the two for the same Image.",
  section: 'Official plugins',
  tags: ["image-filter", "fill", "filter", "Image"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
