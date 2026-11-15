// l7 example: Raster band function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster band function',
  summary:
    'parser.operation can also be a function that receives every extracted band and returns { rasterData }. This one takes the brighter of near-infrared and red, cell by cell.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'parser', 'operation', 'function', 'format'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
