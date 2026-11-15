// leaflet example: Layer group to GeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer group to GeoJSON",
  summary:
    "toGeoJSON on a LayerGroup of markers, a polyline and a polygon returns a FeatureCollection; toMultiPoint returns the markers' positions. A precision select rounds the coordinates.",
  section: "Layer groups",
  tags: ["LayerGroup", "toGeoJSON", "toMultiPoint", "precision"],
  docs: [
    'repo/src/layer/LayerGroup.js',
    'repo/src/layer/vector/Polyline.js',
    'repo/src/layer/vector/Polygon.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
