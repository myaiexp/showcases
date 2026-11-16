// leafer-ui example: Filter: animate a filter value every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: animate a filter value every frame",
  summary:
    "A custom hue-rotate filter whose angle is changed on every frame (filter is re-assigned from a loop), turning a flat colour scene through the whole colour wheel.",
  section: 'Official plugins',
  tags: ["filter", "Filter.register", "hue-rotate"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
