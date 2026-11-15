// l7 example: Raster layer noDataValue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer noDataValue',
  summary:
    'style({ noDataValue }) names a value that is never drawn. The grid has a square patch of -9999 (a typical no-data marker); set noDataValue to -9999 and the patch turns transparent.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'style', 'noDataValue'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
