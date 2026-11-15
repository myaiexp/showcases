// leaflet example: panTo and panBy chained
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "panTo and panBy chained",
  summary:
    "Chained panTo and panBy calls on a map. In Leaflet 2 each call builds on where the running animation is heading, so panTo(Rome).panBy([120, 0]) ends 120 px east of Rome and three quick panBy([100, 0]) calls add up to 300 px. A polyline and dots mark every place the view finished at.",
  section: "Map view",
  tags: ["panTo", "panBy", "PanOptions", "duration", "easeLinearity", "Polyline", "CircleMarker", "moveend"],
  docs: ["repo/src/map/Map.js", "repo/MIGRATION.md", "repo/src/layer/vector/Polyline.js", "repo/src/layer/vector/CircleMarker.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
