// leaflet example: Standalone popup: openOn and addTo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Standalone popup: openOn and addTo",
  summary:
    "Click the map to create a Popup with new Popup(latlng, {content}). Added with openOn(map) a new popup closes the previous one; added with addTo(map) they all stay open.",
  section: "Popups & tooltips",
  tags: ["Popup", "openOn", "addTo", "close", "getContent"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
