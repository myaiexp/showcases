// l7 example: Tileset events and properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tileset events and properties',
  summary:
    'The tile source\'s tileset reports tiles-load-start and tiles-load-finished as the map moves, plus isLoaded, currentTiles and currentZoom. Tiles answer after 400 ms so the loading state shows.',
  section: 'Tile Layer',
  tags: ['tileset', 'tiles-load-start', 'tiles-load-finished', 'isLoaded', 'currentTiles', 'currentZoom', 'getSource'],
  docs: [
    'repo/site/docs/api/common/source/tile/method.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
