// leaflet example: Tooltip offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip offset",
  summary:
    "A permanent tooltip's offset option as [x, y] pixels, changed with sliders by setting options.offset and calling update(). Positive x moves it right, positive y down.",
  section: "Popups & tooltips",
  tags: ["offset", "update", "setTooltipContent", "bindTooltip"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
