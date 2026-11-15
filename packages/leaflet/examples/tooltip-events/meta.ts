// leaflet example: Tooltip events: tooltipopen and tooltipclose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip events: tooltipopen and tooltipclose",
  summary:
    "Two markers with tooltips. Each open and close fires tooltipopen and tooltipclose on the marker and on the map; the log shows both with the tooltip each event carries.",
  section: "Popups & tooltips",
  tags: ["tooltipopen", "tooltipclose", "TooltipEvent", "bindTooltip"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
