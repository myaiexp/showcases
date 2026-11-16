// leafer-ui example: Point: rotateOf and scaleOf
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point: rotateOf and scaleOf",
  summary: "rotate() and scale() work about (0, 0); rotateOf(origin, deg) and scaleOf(origin, k) work about any point and return the Point so calls chain. The red dot moves as the angle or factor changes around the blue origin.",
  section: "Utilities",
  tags: ["Point", "rotate", "rotateOf", "scale", "scaleOf", "clone"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Point.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
