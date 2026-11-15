// leaflet example: Permanent tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Permanent tooltips",
  summary:
    "Four markers with bindTooltip(name, {permanent}). Permanent tooltips stay open as labels; a toggle binds them again without permanent, so they open only on hover.",
  section: "Popups & tooltips",
  tags: ["permanent", "bindTooltip", "direction"],
  docs: ["repo/src/layer/Tooltip.js", "repo/src/layer/DivOverlay.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
