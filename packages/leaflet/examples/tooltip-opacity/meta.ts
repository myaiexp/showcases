// leaflet example: Tooltip opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip opacity",
  summary:
    "Three permanent tooltips with opacity 1, 0.5 and 0.15 on a light map. A slider calls setOpacity() on the first; the default is 0.9.",
  section: "Popups & tooltips",
  tags: ["opacity", "setOpacity", "bindTooltip"],
  docs: ['repo/src/layer/Tooltip.js', 'repo/src/layer/DivOverlay.js', 'repo/src/layer/Layer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
