// leaflet example: Closest point on a segment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Closest point on a segment",
  summary:
    "LineUtil.closestPointOnSegment and pointToSegmentDistance for a point that moves round a segment, or is placed by a click: the nearest point, a dashed line to it and a circle of that radius.",
  section: "Geometry & types",
  tags: ["LineUtil", "closestPointOnSegment", "pointToSegmentDistance"],
  docs: ["repo/src/geometry/LineUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
