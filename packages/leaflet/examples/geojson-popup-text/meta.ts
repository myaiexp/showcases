// leaflet example: GeoJSON popup content as text or HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON popup content as text or HTML",
  summary:
    "A feature whose popupContent contains markup gets a popup either from the string (parsed as HTML) or from an element filled through textContent (shown as written). A toggle switches between them.",
  section: "GeoJSON",
  tags: ["GeoJSON", "onEachFeature", "bindPopup", "textContent", "openPopup"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/GeoJSON.js', 'repo/docs/examples/geojson/index.md', 'repo/src/layer/Layer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
