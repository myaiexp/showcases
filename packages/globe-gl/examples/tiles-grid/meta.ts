// globe-gl example: Tiles: a grid of tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiles: a grid of tiles",
  summary:
    "tilesData with a grid of spherical tiles given by lat, lng, tileWidth and tileHeight, in a checkerboard of two materials. A select changes the tile size from 6 to 30 degrees.",
  section: "Tiles Layer",
  tags: ["tilesData", "tileLat", "tileLng", "tileWidth", "tileHeight", "tileMaterial"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
