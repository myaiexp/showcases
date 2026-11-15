// l7 example: Ramp colors: custom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ramp colors: custom',
  summary:
    'rampColors type \'custom\' paints each colour between two chosen data values: positions has one more entry than colors, and the steps need not be equal.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'rampColors', 'type: \'custom\'', 'positions'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
