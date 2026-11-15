// leaflet example: bindPopup on markers and paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bindPopup on markers and paths",
  summary:
    "A marker, a circle and a polygon each get bindPopup. Clicking the marker opens its popup on the marker's popup anchor; clicking a shape opens it at the click point, and a second click moves it.",
  section: "Popups & tooltips",
  tags: ["bindPopup", "openPopup", "Marker", "Circle", "Polygon"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js", "repo/docs/examples/quick-start/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
