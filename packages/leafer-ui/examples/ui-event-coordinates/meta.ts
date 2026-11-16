// leafer-ui example: UIEvent: page, box, inner and local points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UIEvent: page, box, inner and local points",
  summary: "An event's x and y are world coordinates; getPagePoint(), getBoxPoint(), getInnerPoint() and getLocalPoint() convert them for the element that listens. A rotated, scaled group shows how the numbers differ for one tap.",
  section: "Events",
  tags: ["UIEvent", "getPagePoint", "getBoxPoint", "getInnerPoint", "getLocalPoint"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/UIEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
