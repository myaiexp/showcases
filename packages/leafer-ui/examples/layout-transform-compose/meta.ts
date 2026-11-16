// leafer-ui example: Layout: how the matrix is composed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: how the matrix is composed",
  summary:
    "localTransform is composed from rotation, skew, scale and translation in that order, and worldTransform adds the parents. Change the properties and read the matrix.",
  section: "Layout",
  tags: ["localTransform","worldTransform","rotation","skewX","scaleX"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/transform.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
