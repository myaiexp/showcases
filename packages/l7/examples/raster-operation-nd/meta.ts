// l7 example: Raster nd quick operation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster nd quick operation',
  summary:
    'operation { type: \'nd\' } is the shortcut for a normalized difference of the first two bands. Handing it near-infrared and red gives the same vegetation index as writing out the expression.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'parser', 'operation', 'type: \'nd\'', 'format'],
  docs: [
    'repo/site/docs/api/common/source/raster/raster_band_calc.en.md',
    'repo/site/docs/api/common/source/raster/raster_multi.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
