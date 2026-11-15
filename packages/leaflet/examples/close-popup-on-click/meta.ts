// leaflet example: closePopupOnClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "closePopupOnClick",
  summary:
    "Two markers with popups on a map. With closePopupOnClick true a click on the empty map closes the open popup; with it false the popup stays. The Tallinn popup sets closeOnClick: false itself, which beats the map option. Popup events are logged.",
  section: "Map interaction",
  tags: ["closePopupOnClick", "closeOnClick", "bindPopup", "popupopen", "popupclose"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/Popup.js", "repo/src/layer/marker/Marker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
