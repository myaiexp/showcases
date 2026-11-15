// l7 example: GeoJSON geometry types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON geometry types",
  summary:
    "A source reads every GeoJSON geometry without a parser: Point, MultiPoint, LineString, MultiLineString, Polygon (with a hole) and MultiPolygon.",
  section: "Source",
  tags: ["geojson","Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"],
  docs: ["repo/site/docs/api/source/geojson.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
