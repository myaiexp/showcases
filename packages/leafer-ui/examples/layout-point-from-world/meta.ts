// leafer-ui example: Layout: points from world coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: points from world coordinates",
  summary:
    "getPagePoint, getLocalPoint, getInnerPoint and getBoxPoint convert a world point into page, local, inner and box coordinates. A world point circles the rect and each method's result is printed.",
  section: "Layout",
  tags: ["getPagePoint","getLocalPoint","getInnerPoint","getBoxPoint"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/point.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
