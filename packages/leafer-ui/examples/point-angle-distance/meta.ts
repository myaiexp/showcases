// leafer-ui example: Point: angle, rotation, distance and center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point: angle, rotation, distance and center",
  summary: "From a fixed point, getAngle(to) and getAtan2(to) give the direction to a moving point, getRotation(origin, to) the turn about an origin, getDistance(to) the length and getCenter(to) the midpoint. Move the pointer over the pane.",
  section: "Utilities",
  tags: ["Point", "getAngle", "getAtan2", "getRotation", "getDistance", "getCenter"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Point.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
