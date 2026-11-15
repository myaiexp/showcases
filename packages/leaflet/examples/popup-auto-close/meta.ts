// leaflet example: Popup autoClose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup autoClose",
  summary:
    "Two pairs of markers. Opening a popup closes the one open before it when that one has autoClose true (left pair); popups whose autoClose is false stay open together (right pair).",
  section: "Popups & tooltips",
  tags: ["autoClose", "closeOnClick", "bindPopup", "closePopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
