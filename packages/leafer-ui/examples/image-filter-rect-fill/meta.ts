// leafer-ui example: Image filter: on a Rect's image fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: on a Rect's image fill",
  summary:
    "The filter belongs to the image paint, so any element with an image fill can use it: here a rounded, stroked Rect whose picture is desaturated and warmed by a filter array with mode \"fit\".",
  section: 'Official plugins',
  tags: ["image-filter", "Rect", "fill", "filter", "mode"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
