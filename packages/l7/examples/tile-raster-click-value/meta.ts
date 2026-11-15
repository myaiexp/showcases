// l7 example: Data raster tile click value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data raster tile click value',
  summary:
    'Data raster tiles are pickable: a layer click event adds value, the number under the pointer. Click the elevation tiles to read it.',
  section: 'Tile Layer',
  tags: ['RasterLayer', 'dataType: \'arraybuffer\'', 'on', 'click', 'value'],
  docs: [
    'repo/site/docs/api/tile/raster_tile_layer.en.md',
    'repo/site/docs/api/tile/common/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
