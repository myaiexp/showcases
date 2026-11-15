// l7 example: Raster layer clampHigh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer clampHigh',
  summary:
    'clampHigh decides what happens over the domain\'s upper end. In 2.29.1 false hides those cells, so the peaks vanish, and true paints them in the top colour, the reverse of the docs.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'style', 'clampHigh', 'domain'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
