// leafer-ui example: Filter: an array applies filters in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: an array applies filters in order",
  summary:
    "filter accepts an array; the plugin runs each registered processor in turn and adds the spreads together. Here grayscale then blur are stacked, and the toggles switch each one off.",
  section: 'Official plugins',
  tags: ["filter", "Filter.register", "getSpread", "visible"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
