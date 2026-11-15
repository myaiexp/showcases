// l7 example: Raster rgb operation from one file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster rgb operation from one file',
  summary:
    'Source type \'rasterRgb\' with operation { type: \'rgb\' } reads bands from file bytes through format() and stretches them into one colour image, with options.countCut setting the stretch.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'type: \'rasterRgb\'', 'operation', 'type: \'rgb\'', 'format', 'bands'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
    'repo/site/docs/api/raster_layer/raster_rgb.en.md',
    'repo/site/docs/tutorial/tile/raster_tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
