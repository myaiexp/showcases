// leaflet example: Choropleth: legend control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Choropleth: legend control",
  summary:
    "A Control in the bottom-right corner lists the eight density intervals with coloured squares. Hovering a row dims the states outside that interval through setStyle.",
  section: "Choropleth",
  tags: ["Control", "onAdd", "DomUtil.create", "position", "setStyle"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/choropleth/index.md", "repo/docs/examples/choropleth/us-states.js", "repo/src/control/Control.js", "repo/src/dom/DomUtil.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
