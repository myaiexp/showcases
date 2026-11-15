// leaflet example: Polyline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polyline",
  summary:
    "A line through four cities made with new Polyline(latlngs, options). The map zooms in on it with fitBounds(line.getBounds()) and back out.",
  section: "Vector layers",
  tags: ["Polyline", "getBounds", "fitBounds"],
  docs: ['repo/src/layer/vector/Polyline.js', 'repo/src/layer/vector/Path.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
