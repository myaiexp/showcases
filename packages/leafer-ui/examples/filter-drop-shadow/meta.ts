// leafer-ui example: Filter: a drop-shadow filter that grows the bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: a drop-shadow filter that grows the bounds",
  summary:
    "A custom drop-shadow() filter paints a blurred shadow that follows the element's alpha; getSpread returns the offset plus the blur so the shadow is not clipped. The sliders change both.",
  section: 'Official plugins',
  tags: ["Filter.register", "getSpread", "filter", "drop-shadow"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
