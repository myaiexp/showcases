// l7 example: source: GeoJSON lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source: GeoJSON lines",
  summary:
    "GeoJSON is understood by default: pass a FeatureCollection of LineStrings and every vertex becomes part of the line. No parser option is needed.",
  section: "Line Layer",
  tags: ["source","GeoJSON","LineString"],
  docs: ["repo/site/docs/api/line_layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
