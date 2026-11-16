// leafer-ui example: Filter: getSpread widens the render bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: getSpread widens the render bounds",
  summary:
    "Two engines draw the same blurred square. Left: getSpread returns the blur radius, so the soft edge is complete. Right: getSpread returns 0, so the render bounds stay put and the blur is cut at the square's edge.",
  section: 'Official plugins',
  tags: ["Filter.register", "getSpread", "renderBounds"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
