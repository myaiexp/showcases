// l7 example: Ramp colors: cat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ramp colors: cat',
  summary:
    'rampColors type \'cat\' colours enumerated values: the grid holds whole numbers 0-255 (a land-cover-like class map) and positions lists the classes that get a colour.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'rampColors', 'type: \'cat\'', 'positions', 'Uint8Array'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
