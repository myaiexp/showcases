// leaflet example: Tooltip setTooltipContent and getTooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip setTooltipContent and getTooltip",
  summary:
    "A tooltip whose content is a function that Leaflet runs each time it opens, counting the opens, and a second tooltip whose text a button changes with setTooltipContent. getTooltip().getContent() reads it back.",
  section: "Popups & tooltips",
  tags: ["bindTooltip", "setTooltipContent", "getTooltip", "getContent"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
