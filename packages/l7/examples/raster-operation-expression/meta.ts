// l7 example: Raster band expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster band expression',
  summary:
    'parser.operation can be an array expression over the bands: [\'*\', [\'band\', 1], 0.5] halves band 1, and expressions nest. Pick one and the grid is recalculated from the same file.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'parser', 'operation', 'expression', 'band'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
