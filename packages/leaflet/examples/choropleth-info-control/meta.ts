// leaflet example: Choropleth: info control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: info control",
  summary:
    "A Control subclass in the top-right corner shows the hovered state's name and density, updated from pointerover and pointerout. Its text is built with DOM nodes and textContent.",
  section: "Choropleth",
  tags: ["Control", "onAdd", "DomUtil.create", "GeoJSON", "pointerover", "pointerout"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/control/Control.js", "repo/src/dom/DomUtil.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
