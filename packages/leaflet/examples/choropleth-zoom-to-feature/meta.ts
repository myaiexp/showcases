// leaflet example: Choropleth: click to zoom to a state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: click to zoom to a state",
  summary:
    "A click listener added in onEachFeature calls map.fitBounds with the clicked state's getBounds. A button returns to the whole US.",
  section: "Choropleth",
  tags: ["GeoJSON", "onEachFeature", "click", "fitBounds", "getBounds"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/layer/GeoJSON.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
