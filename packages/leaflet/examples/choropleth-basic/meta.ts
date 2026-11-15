// leaflet example: Choropleth: basic states map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: basic states map",
  summary:
    "The US states data is added with new GeoJSON(statesData) and shows in Leaflet's default path style.",
  section: "Choropleth",
  tags: ["GeoJSON", "LeafletMap", "setView"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/layer/GeoJSON.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
