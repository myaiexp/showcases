// globe-gl example: Polygons: GeoJSON geometry accessor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: GeoJSON geometry accessor",
  summary:
    "polygonGeoJsonGeometry reads each shape from a custom field called outline: hand-drawn Polygon, MultiPolygon and a polygon with a hole, plus three countries. A LineString is skipped, since only Polygon and MultiPolygon are drawn.",
  section: "Polygons Layer",
  tags: ["polygonGeoJsonGeometry", "polygonsData", "polygonLabel"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
