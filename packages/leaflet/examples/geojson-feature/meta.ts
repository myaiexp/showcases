// leaflet example: GeoJSON input forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON input forms",
  summary:
    "A text select switches what is passed to new GeoJSON(): a Feature, a bare geometry, an array of two LineStrings or a FeatureCollection. Leaflet draws a Marker for the Point and polylines for the lines in each case.",
  section: "GeoJSON",
  tags: ["GeoJSON", "Feature", "FeatureCollection", "LineString", "addTo"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
