// leaflet example: Bounds contains, intersects, overlaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds contains, intersects, overlaps",
  summary:
    "Two pixel Bounds: a green one slides across a blue one and contains, intersects, overlaps and equals are read, including the touching case where intersects is true and overlaps false.",
  section: "Geometry & types",
  tags: ["Bounds", "contains", "intersects", "overlaps", "equals"],
  docs: ["repo/src/geometry/Bounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
