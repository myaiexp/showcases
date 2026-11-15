// leaflet example: Popup events: popupopen and popupclose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup events: popupopen and popupclose",
  summary:
    "Two markers with popups. Each open and close fires popupopen and popupclose on the marker the popup is bound to and on the map; the log shows both, in order, with the popup each event carries.",
  section: "Popups & tooltips",
  tags: ["popupopen", "popupclose", "PopupEvent", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
