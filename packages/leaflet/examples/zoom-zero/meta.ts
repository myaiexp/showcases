// leaflet example: zoom-zero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Zoom level 0: the world in one tile",
  summary:
    "The Zoom Levels tutorial's first map: minZoom and maxZoom 0 lock the map to zoom 0, where the whole world is one 256 px tile. Grid tiles show the tile's edge and z/x/y; a dot circles the world.",
  section: "Zoom levels",
  tags: ["LeafletMap", "minZoom", "maxZoom", "setView", "TileLayer"],
  docs: ['repo/docs/examples/zoom-levels/index.md', 'repo/src/layer/vector/CircleMarker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
