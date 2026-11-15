// l7 example: Raster from a binary file with format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster from a binary file with format',
  summary:
    'Hand the source raw file bytes plus a format(data, bands) function that returns { rasterData, width, height }. Here the bytes are a made-up 6-band file, and band 3 (near-infrared) is read out and coloured.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'source', 'parser', 'format', 'IBandsData', 'bands'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
