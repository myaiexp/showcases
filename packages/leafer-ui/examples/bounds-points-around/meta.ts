// leafer-ui example: Bounds: getPoints and getPoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: getPoints and getPoint",
  summary: "getPoints() lists a bounds' four corners and getPoint(around) returns any of the nine anchor points ('top-left', 'center', 'bottom'...). Applied to a rotated box with toOuterOf, they give the anchors of the turned shape.",
  section: "Utilities",
  tags: ["Bounds", "getPoints", "getPoint", "toOuterOf", "IAlign"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Bounds.md", "pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
