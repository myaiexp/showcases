// l7 example: Raster NDI
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster NDI',
  summary:
    'Source type \'ndi\' computes the normalized difference of two bands, (b - a) / (b + a), per cell. With red and near-infrared it is a vegetation index; forest shows green, rock and water brown.',
  section: 'Raster Layer',
  tags: ['RasterLayer', 'type: \'ndi\'', 'bands', 'rampColors', 'domain'],
  docs: [
    'repo/site/docs/api/raster_layer/raster_ndi.en.md',
    'repo/site/docs/api/common/source/raster/raster_ndi.en.md',
    'repo/site/docs/api/common/layer/raster/style.en.md',
    'repo/site/docs/api/common/layer/raster/rampcolors.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
