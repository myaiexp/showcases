// leafer-ui example: Layout: transform and setTransform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: transform and setTransform",
  summary:
    "transform(matrix) applies a matrix on top of the current one, so repeating it stacks; setTransform(matrix) replaces it, so repeating changes nothing. Both panes use the same matrix.",
  section: "Layout",
  tags: ["transform","setTransform"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/transform.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
