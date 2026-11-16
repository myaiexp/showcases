// leafer-ui example: Image filter: one picture, two different filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: one picture, two different filters",
  summary:
    "Two Images draw the same url with different filters at once. Each element has its own filtered canvas, so one picture can be warm in one place and cold in another without being loaded twice.",
  section: 'Official plugins',
  tags: ["image-filter", "filter", "temperature", "Image"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
