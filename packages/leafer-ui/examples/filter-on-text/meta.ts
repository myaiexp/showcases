// leafer-ui example: Filter: blur a Text and a Box together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: blur a Text and a Box together",
  summary:
    "filter works on any element: a Text blurs by itself, and a Box (Groups ignore filter) blurs everything inside it as one picture, so overlapping children are blurred together rather than one by one.",
  section: 'Official plugins',
  tags: ["filter", "Text", "Box", "Filter.register"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/filter.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
