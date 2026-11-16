// leafer-ui example: Hit: ask an element with hit(point, radius)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: ask an element with hit(point, radius)",
  summary: "element.hit(worldPoint, hitRadius) answers whether a world point collides with the element, with an optional radius. The rect turns red while the pointer is within the radius; the readout shows the call.",
  section: "Interaction",
  tags: ["hit","hitRadius","PointerEvent","world point"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
