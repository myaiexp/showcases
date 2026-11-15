// leaflet example: Set latlngs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Set latlngs",
  summary:
    "setLatLngs replaces every point of a Polyline in one call, including with an empty array. isEmpty() reports whether any are left.",
  section: "Vector layers",
  tags: ["Polyline", "setLatLngs", "isEmpty"],
  docs: ['repo/src/layer/vector/Polyline.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
