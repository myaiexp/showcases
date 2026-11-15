// leaflet example: Popup autoPan and padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup autoPan and padding",
  summary:
    "A marker near the top right corner opens a popup that does not fit. With autoPan the map pans so it fits, keeping autoPanPadding from the edge, and fires autopanstart; with autoPan false the popup is cut off.",
  section: "Popups & tooltips",
  tags: ["autoPan", "autoPanPadding", "autopanstart", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
