// l7 example: Raster from several files
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster from several files',
  summary:
    'The source can take a list of { data, bands } entries, one per file, each naming the bands to read. Here red comes from one file and near-infrared from another, and an expression combines them.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'source', 'IBandsData', 'bands', 'operation', 'format'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
