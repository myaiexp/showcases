// leaflet example: Sticky tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sticky tooltip",
  summary:
    "Two polygons with tooltips. With sticky true the tooltip follows the pointer over the shape; without it the tooltip sits at the shape's centre.",
  section: "Popups & tooltips",
  tags: ["sticky", "bindTooltip", "Polygon", "pointermove"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
