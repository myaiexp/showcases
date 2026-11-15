// leaflet example: A tooltip and a popup on one layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A tooltip and a popup on one layer",
  summary:
    "One marker with bindTooltip and bindPopup. Hovering shows the tooltip, clicking opens the popup, and each closes by its own rule.",
  section: "Popups & tooltips",
  tags: ["bindTooltip", "bindPopup", "Marker"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Popup.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
