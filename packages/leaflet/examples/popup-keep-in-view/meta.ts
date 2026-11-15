// leaflet example: Popup keepInView
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup keepInView",
  summary:
    "An open popup with keepInView true: dragging the map so the popup would leave the view makes the map pan back. With keepInView false the same drag carries the popup out of sight.",
  section: "Popups & tooltips",
  tags: ["keepInView", "autopanstart", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
