// l7 example: Ramp colors: linear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ramp colors: linear',
  summary:
    'rampColors type \'linear\' puts the colours at data values (positions in the data\'s own units, not 0-1), blending smoothly between them.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'rampColors', 'type: \'linear\'', 'positions'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
