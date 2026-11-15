// leaflet example: map.openPopup and closePopup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "map.openPopup and closePopup",
  summary:
    "Click the map and map.openPopup(content, latlng, options) builds and opens a popup there, closing the previous one. map.closePopup() closes the open popup. No Popup object or layer is needed.",
  section: "Popups & tooltips",
  tags: ["Map.openPopup", "Map.closePopup", "Popup"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
