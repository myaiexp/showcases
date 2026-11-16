// leafer-ui example: dragBoundsType: auto, outer, inner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "dragBoundsType: auto, outer, inner",
  summary: "dragBoundsType decides how dragBounds applies: 'outer' keeps the element inside the box, 'inner' makes the element always cover the box, 'auto' picks by size. Two elements of different size show it.",
  section: "Element advanced",
  tags: ["dragBounds", "dragBoundsType", "IDragBoundsType"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/dragBounds.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
