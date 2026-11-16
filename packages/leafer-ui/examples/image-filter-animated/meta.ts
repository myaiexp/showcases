// leafer-ui example: Image filter: animate a filter value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: animate a filter value",
  summary:
    "A timer sets a new tint value a few times a second, so the GPU repaints the filtered copy each time and the hue of the picture drifts back and forth. Each change costs a shader and a texture, so the steps are coarse.",
  section: 'Official plugins',
  tags: ["image-filter", "tint", "filter", "fill"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
