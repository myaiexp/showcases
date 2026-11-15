// leaflet example: worldCopyJump
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "worldCopyJump",
  summary:
    "A world map with four labelled markers around the date line. With worldCopyJump on, panning to another copy of the world jumps back to the original so the markers stay visible, and the worldcopyjump event reports the jump. A toggle switches the option off to compare.",
  section: "Map view",
  tags: ["worldCopyJump", "worldcopyjump", "panBy", "Marker", "bindTooltip"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/marker/Marker.js", "repo/src/layer/Tooltip.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
