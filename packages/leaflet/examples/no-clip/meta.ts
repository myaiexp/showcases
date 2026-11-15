// leaflet example: No clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "No clip",
  summary:
    "Two zigzags of 40 vertices run past the edges of the map. The default one is clipped to the visible area; the noClip one keeps every vertex. The caption counts path points while the map pans.",
  section: "Vector layers",
  tags: ["Polyline", "noClip", "panBy"],
  docs: ['repo/src/layer/vector/Polyline.js', 'repo/src/geometry/LineUtil.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
