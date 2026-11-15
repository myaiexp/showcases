// leaflet example: zoomReverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zoomReverse",
  summary:
    "zoomReverse makes the zoom in the tile URL maxZoom minus the map zoom, for servers that number levels the other way. With the grid style the tile prints the zoom the server was asked for, which is not the map's, so the picture is not a world map. A toggle turns it off to compare.",
  section: "Tile layers",
  tags: ["TileLayer", "zoomReverse", "maxZoom"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/TileLayer.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
