// leaflet example: Tooltip methods: open, close, toggle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip methods: open, close, toggle",
  summary:
    "Buttons call openTooltip, openTooltip(latlng), closeTooltip and toggleTooltip on one marker, and the caption reports isTooltipOpen() after each.",
  section: "Popups & tooltips",
  tags: ["openTooltip", "closeTooltip", "toggleTooltip", "isTooltipOpen"],
  docs: ["repo/src/layer/Layer.js", "repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
