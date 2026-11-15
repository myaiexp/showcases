// l7 example: Polygon: source: a GeoJSON FeatureCollection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: source: a GeoJSON FeatureCollection",
  summary:
    "Polygon data is GeoJSON, which L7 reads with no parser. A FeatureCollection holds one polygon feature per shape, as in the docs; setData swaps it for another.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","source","GeoJSON","setData","FeatureCollection"],
  docs: ["repo/site/docs/api/polygon_layer/source.en.md","repo/site/docs/api/polygon_layer/polygonlayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
