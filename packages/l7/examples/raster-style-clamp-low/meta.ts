// l7 example: Raster layer clampLow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer clampLow',
  summary:
    'clampLow decides what happens under the domain\'s lower end. In 2.29.1 false hides those cells and true (the default) paints them in the lowest colour, the reverse of the docs. Raise the lower end to carve the low ground out.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'style', 'clampLow', 'domain'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
