// l7 example: Raster layer opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer opacity',
  summary:
    'style({ opacity }) fades the raster over the map, 1 being solid. Colours still come from rampColors.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'style', 'opacity'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
