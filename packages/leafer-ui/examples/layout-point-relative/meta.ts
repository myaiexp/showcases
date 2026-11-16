// leafer-ui example: Layout: points relative to an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: points relative to an element",
  summary:
    "The second argument of the conversions treats an ancestor as the world: getWorldPoint(inner, frame) gives coordinates inside the Frame instead of on the canvas.",
  section: "Layout",
  tags: ["getWorldPoint","relative","Frame"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/point.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
