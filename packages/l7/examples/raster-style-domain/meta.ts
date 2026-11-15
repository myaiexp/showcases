// l7 example: Raster layer domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer domain',
  summary:
    'style({ domain }) is the range of values that the ramp is spread over. Narrowing it to [0, 3000] makes the same grid look higher; widening it flattens it.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'style', 'domain'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
