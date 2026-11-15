// leaflet example: GeoJSON tutorial: Denver sample
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON tutorial: Denver sample",
  summary:
    "The tutorial's Denver data in one map: a baseball Icon marker for the stadium, circle markers for bicycle rental, bus lines styled by underConstruction, the campus polygon styled from its own properties, popups through onEachFeature.",
  section: "GeoJSON",
  tags: ["GeoJSON", "style", "pointToLayer", "onEachFeature", "Icon", "CircleMarker"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/GeoJSON.js", "repo/docs/examples/geojson/index.md", "repo/docs/examples/geojson/sample-geojson.js", "repo/docs/examples/geojson/baseball-marker.png"],
  provenance: 'pure',
  added: '2026-11-15',
});
