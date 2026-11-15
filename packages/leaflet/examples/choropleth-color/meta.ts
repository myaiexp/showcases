// leaflet example: Choropleth: colour by density
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: colour by density",
  summary:
    "The states are filled from a getColor function on properties.density through the GeoJSON style option, with a white dashed outline. A toggle fades the fill with setStyle.",
  section: "Choropleth",
  tags: ["GeoJSON", "style", "setStyle", "fillColor", "dashArray"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/layer/GeoJSON.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
