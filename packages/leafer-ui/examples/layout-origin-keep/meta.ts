// leafer-ui example: Layout: keep position when origin changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: keep position when origin changes",
  summary:
    "Assigning origin moves the element; saving localTransform first and calling setTransform() afterwards keeps it where it was. Left: the star jumps. Right: it stays.",
  section: "Layout",
  tags: ["origin","localTransform","setTransform"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/origin.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
