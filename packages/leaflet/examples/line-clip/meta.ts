// leaflet example: LineUtil clipSegment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LineUtil clipSegment",
  summary:
    "LineUtil.clipSegment applied segment by segment to a polyline against a rectangle, with useLastCode for consecutive segments and round on. Kept pieces are green, cut ends orange, segments outside return false.",
  section: "Geometry & types",
  tags: ["LineUtil", "clipSegment", "Bounds"],
  docs: ["repo/src/geometry/LineUtil.js", "repo/src/geometry/Bounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
