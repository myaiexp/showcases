// leaflet example: bindTooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "bindTooltip",
  summary:
    "Markers with bindTooltip(text). A tooltip opens while the pointer is over the marker (or the marker has keyboard focus) and closes when it leaves; the default direction is auto.",
  section: "Popups & tooltips",
  tags: ["bindTooltip", "Marker"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
