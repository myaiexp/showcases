// leaflet example: Interactive tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive tooltip",
  summary:
    "Two permanent tooltips, one with interactive true. The interactive tooltip receives the click itself and counts it; the other lets the pointer through.",
  section: "Popups & tooltips",
  tags: ["interactive", "bindTooltip", "click", "getTooltip"],
  docs: ['repo/src/layer/Tooltip.js', 'repo/src/layer/DivOverlay.js', 'repo/src/layer/Layer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
