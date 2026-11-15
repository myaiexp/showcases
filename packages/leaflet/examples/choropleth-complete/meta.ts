// leaflet example: Choropleth: the finished map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: the finished map",
  summary:
    "The whole choropleth tutorial together: density colours, hover highlight, click to zoom, an info control and a legend control.",
  section: "Choropleth",
  tags: ["GeoJSON", "Control", "style", "onEachFeature", "fitBounds", "resetStyle", "DomUtil.create"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/control/Control.js", "repo/src/dom/DomUtil.js", "repo/src/layer/GeoJSON.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
