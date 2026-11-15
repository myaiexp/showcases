// leaflet example: Standalone tooltip and map.openTooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Standalone tooltip and map.openTooltip",
  summary:
    "A permanent Tooltip added with new Tooltip(latlng, {content}).addTo(map) as a map label, and map.openTooltip(content, latlng, options) on each map click. map.closeTooltip(tooltip) and openOn(map) hide and show the label.",
  section: "Popups & tooltips",
  tags: ["Tooltip", "addTo", "openOn", "Map.openTooltip", "Map.closeTooltip"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
