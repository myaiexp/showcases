// leaflet example: Tooltip direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip direction",
  summary:
    "Six markers, each with a permanent tooltip in one direction: right, left, top, bottom, center and auto. The map pans back and forth so the auto tooltip flips between right and left.",
  section: "Popups & tooltips",
  tags: ["direction", "permanent", "bindTooltip", "panBy"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
