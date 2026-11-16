// leafer-ui example: Filter: any CSS filter function as a custom filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: any CSS filter function as a custom filter",
  summary:
    "The same apply() recipe takes any CSS filter function: the select picks grayscale, sepia, invert, hue-rotate or contrast, applied to a small picture scene with one registered filter.",
  section: 'Official plugins',
  tags: ["Filter.register", "filter", "apply", "canvas.filter"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
