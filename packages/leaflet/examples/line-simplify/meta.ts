// leaflet example: LineUtil simplify
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LineUtil simplify",
  summary:
    "LineUtil.simplify on a 90-point line: the Douglas-Peucker result and its points are drawn over the original, with the tolerance in pixels on a slider and the kept count in the caption.",
  section: "Geometry & types",
  tags: ["LineUtil", "simplify", "Point"],
  docs: ["repo/src/geometry/LineUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
