// leaflet example: GeoJSON geometry types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON geometry types",
  summary:
    "One GeoJSON layer holds a feature of each of the seven geometry types. A select zooms to each one and the caption names the Leaflet layer it became: Marker, Polyline, Polygon or FeatureGroup.",
  section: "GeoJSON",
  tags: ["GeoJSON", "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "FeatureGroup"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/GeoJSON.js',
    'repo/docs/examples/geojson/index.md',
    'repo/src/map/Map.js',
    'repo/src/geo/LatLng.js',
    'repo/src/layer/LayerGroup.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
