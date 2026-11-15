// l7 example: Reload tiles by extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reload tiles by extent',
  summary:
    'source.reloadTileByExtent([minLng, minLat, maxLng, maxLat], zoom) reloads the tiles of that level that cover a box, leaving the rest alone. The box here is the northern third of the view.',
  section: 'Tile Layer',
  tags: ['reloadTileByExtent', 'getSource', 'RasterLayer'],
  docs: [
    'repo/site/docs/api/common/source/tile/method.en.md',
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
