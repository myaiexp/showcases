// leaflet example: Popup content from a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup content from a function",
  summary:
    "One function passed to bindPopup on three markers. Leaflet calls it with the marker each time the popup opens, so the content is built then, from that marker's own position.",
  section: "Popups & tooltips",
  tags: ["bindPopup", "OverlayContent", "getLatLng"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
