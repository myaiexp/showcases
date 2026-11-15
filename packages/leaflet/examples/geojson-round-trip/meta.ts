// leaflet example: GeoJSON round trip with toGeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON round trip with toGeoJSON",
  summary:
    "A GeoJSON layer of bus lines and a stadium is edited with setLatLngs, then exported whole with toGeoJSON at full, 4 or 2 decimals. The export is shown as JSON and can be added to a second layer with addData.",
  section: "GeoJSON",
  tags: ["GeoJSON", "toGeoJSON", "precision", "setLatLngs", "addData"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/src/layer/GeoJSONUtil.js", "repo/src/layer/vector/Polyline.js", "repo/src/layer/LayerGroup.js", "repo/docs/examples/geojson/sample-geojson.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
