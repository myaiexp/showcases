// l7 example: Ramp colors: quantize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ramp colors: quantize',
  summary:
    'rampColors type \'quantize\' splits the domain into equal steps, one per colour, so the map shows flat bands and needs no positions.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'rampColors', 'type: \'quantize\''],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
