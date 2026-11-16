// leafer-ui example: Filter: register a custom blur filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: register a custom blur filter",
  summary:
    "The filter plugin ships no filters yet; Filter.register(name, { apply, getSpread }) adds one. This blur applies a CSS blur() to the canvas and widens the render bounds, then a Rect uses it as filter: { type: \"blur\", blur: 20 }.",
  section: 'Official plugins',
  tags: ["Filter.register", "filter", "apply", "getSpread"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
