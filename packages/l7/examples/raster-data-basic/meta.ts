// l7 example: Raster layer from an array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster layer from an array',
  summary:
    'A RasterLayer colours one band of numbers: a width x height Float32Array placed on an extent, mapped through domain and rampColors. The grid is an elevation-like field generated in code.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'source', 'type: \'raster\'', 'width', 'height', 'extent', 'rampColors', 'domain'],
  docs: [
    'repo/site/docs/api/raster_layer/raster.en.md',
    'repo/site/docs/api/raster_layer/raster_data.en.md',
    'repo/site/docs/api/common/source/raster/raster_data.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
