// leaflet example: project-unproject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "project and unproject",
  summary:
    "map.project(latlng, zoom) turns a coordinate into projected pixels at any zoom, map.unproject() turns them back, and getPixelWorldBounds(zoom) gives the world's size in pixels. A slider picks the zoom used for projecting; a marker supplies the point.",
  section: "Map events & conversion",
  tags: ["project", "unproject", "getPixelWorldBounds", "Marker"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
